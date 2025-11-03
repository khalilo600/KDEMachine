import stripe
from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.db.models import Q # Import Q object for complex lookups
from django.db import transaction # Import transaction
from djstripe.models import Customer # Import Customer model
from .models import Product, Cart, CartItem, Order, OrderItem # Import Order and OrderItem
from .forms import CustomUserCreationForm, SearchForm, ProductForm, CheckoutForm # Import CheckoutForm

class ProductListView(ListView):
    model = Product
    template_name = 'products/product_list.html'
    context_object_name = 'products'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['search_form'] = SearchForm()
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.GET.get('query')
        if query:
            queryset = queryset.filter(Q(name__icontains=query) | Q(description__icontains=query))
        return queryset

class ProductDetailView(DetailView):
    model = Product
    template_name = 'products/product_detail.html'
    context_object_name = 'product'

def register(request):
    if request.method == 'GET':
        form = CustomUserCreationForm()
        return render(request, 'registration/register.html', {'form': form})
    elif request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('product_list')
        return render(request, 'registration/register.html', {'form': form})

@login_required
def add_to_cart(request, pk):
    product = get_object_or_404(Product, pk=pk)
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect('product_list')

@login_required
def cart_view(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    return render(request, 'products/cart.html', {'cart': cart})

@login_required
def product_create(request):
    if request.method == 'GET':
        form = ProductForm()
        return render(request, 'products/product_form.html', {'form': form})
    elif request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
        return render(request, 'products/product_form.html', {'form': form})

@login_required
def product_update(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'GET':
        form = ProductForm(instance=product)
        return render(request, 'products/product_form.html', {'form': form})
    elif request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product_list')
        return render(request, 'products/product_form.html', {'form': form})

@login_required
def checkout_view(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    cart, created = Cart.objects.get_or_create(user=request.user)
    customer, created = Customer.get_or_create(subscriber=request.user)
    if not cart.items.exists():
        return redirect('cart') # Redirect to cart if empty

    if request.method == 'POST':
        # Create Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': item.product.name,
                        },
                        'unit_amount': int(item.product.price * 100), # Stripe expects amount in cents
                    },
                    'quantity': item.quantity,
                } for item in cart.items.all()
            ],
            mode='payment',
            success_url=request.build_absolute_uri('/products/stripe_success?session_id={CHECKOUT_SESSION_ID}'),
            cancel_url=request.build_absolute_uri('/products/stripe_cancel'),
        )
        return redirect(checkout_session.url, code=303)
    
    form = CheckoutForm() # For GET request or if POST fails
    return render(request, 'products/checkout.html', {'form': form, 'cart': cart, 'stripe_publishable_key': settings.STRIPE_PUBLISHABLE_KEY})

@login_required
def order_history_view(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'products/order_history.html', {'orders': orders})

@login_required
def stripe_success_view(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    session_id = request.GET.get('session_id')
    if session_id:
        try:
            checkout_session = stripe.checkout.Session.retrieve(session_id)
            if checkout_session.payment_status == 'paid':
                cart = get_object_or_404(Cart, user=request.user)
                with transaction.atomic():
                    order = Order.objects.create(
                        user=request.user,
                        total_price=cart.get_total_price(),
                        shipping_address="Stripe Checkout" # Address will be handled by Stripe
                    )
                    for item in cart.items.all():
                        OrderItem.objects.create(
                            order=order,
                            product=item.product,
                            quantity=item.quantity,
                            price=item.product.price
                        )
                    cart.items.all().delete() # Clear the cart
                return redirect('order_history')
            else:
                # Payment not successful, redirect to cancel or checkout
                return redirect('stripe_cancel')
        except stripe.error.StripeError as e:
            # Handle Stripe API errors
            print(f"Stripe error: {e}")
            return redirect('stripe_cancel')
    return redirect('product_list') # Fallback

@login_required
def stripe_cancel_view(request):
    return render(request, 'products/stripe_cancel.html') # A simple cancel page
