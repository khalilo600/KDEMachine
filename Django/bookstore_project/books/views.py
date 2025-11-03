from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages
from django.db.models import Q
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.db import transaction
from .models import Book, Category, Order, OrderItem
from .forms import BookForm

class BookListView(ListView):
    model = Book
    template_name = 'books/book_list.html'
    context_object_name = 'books'

class BookDetailView(DetailView):
    model = Book
    template_name = 'books/book_detail.html'
    context_object_name = 'book'

def add_to_cart(request, pk):
    book = get_object_or_404(Book, pk=pk)
    cart = request.session.get('cart', {})
    cart_item = cart.get(str(pk), {'quantity': 0, 'price': str(book.price), 'title': book.title})
    cart_item['quantity'] += 1
    cart[str(pk)] = cart_item
    request.session['cart'] = cart
    messages.success(request, f'{book.title} added to cart.')
    return redirect('book_list')

def cart_detail(request):
    cart = request.session.get('cart', {})
    cart_items = []
    for pk, item in cart.items():
        book = get_object_or_404(Book, pk=pk)
        cart_items.append({
            'book': book,
            'quantity': item['quantity'],
            'price': float(item['price']),
            'total_price': float(item['price']) * item['quantity']
        })
    return render(request, 'books/cart_detail.html', {'cart_items': cart_items})

def book_search(request):
    query = request.GET.get('q')
    books = Book.objects.filter(
        Q(title__icontains=query) | Q(author__icontains=query) | Q(category__name__icontains=query)
    ).distinct()
    return render(request, 'books/book_list.html', {'books': books, 'query': query})

class BookCreateView(LoginRequiredMixin, CreateView):
    model = Book
    form_class = BookForm
    template_name = 'books/book_form.html'
    success_url = reverse_lazy('book_list')

class BookUpdateView(LoginRequiredMixin, UpdateView):
    model = Book
    form_class = BookForm
    template_name = 'books/book_form.html'
    success_url = reverse_lazy('book_list')

class BookDeleteView(LoginRequiredMixin, DeleteView):
    model = Book
    template_name = 'books/book_confirm_delete.html'
    success_url = reverse_lazy('book_list')

@login_required
def checkout(request):
    cart = request.session.get('cart', {})
    if not cart:
        messages.warning(request, "Your cart is empty.")
        return redirect('cart_detail')

    with transaction.atomic():
        total_price = sum(float(item['price']) * item['quantity'] for item in cart.values())
        order = Order.objects.create(user=request.user, total_price=total_price)
        for pk, item in cart.items():
            book = get_object_or_404(Book, pk=pk)
            OrderItem.objects.create(
                order=order,
                book=book,
                quantity=item['quantity'],
                price=float(item['price'])
            )
        request.session['cart'] = {}
        messages.success(request, "Your order has been placed successfully!")
        return redirect('book_list')

@login_required
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-order_date')
    return render(request, 'books/order_history.html', {'orders': orders})