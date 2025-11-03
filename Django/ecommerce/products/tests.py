from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Product, Cart, CartItem, Order, OrderItem

User = get_user_model()

class ProductModelTest(TestCase):
    def test_product_creation(self):
        product = Product.objects.create(name='Test Product', description='A test description', price=10.00)
        self.assertEqual(product.name, 'Test Product')
        self.assertEqual(product.price, 10.00)

    def test_product_str(self):
        product = Product.objects.create(name='Test Product', description='A test description', price=10.00)
        self.assertEqual(str(product), 'Test Product')

class CartModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.product = Product.objects.create(name='Test Product', description='A test description', price=10.00)

    def test_cart_creation(self):
        cart = Cart.objects.create(user=self.user)
        self.assertEqual(cart.user, self.user)

    def test_cart_str(self):
        cart = Cart.objects.create(user=self.user)
        self.assertEqual(str(cart), f'Cart of {self.user.username}')

    def test_add_item_to_cart(self):
        cart = Cart.objects.create(user=self.user)
        cart_item = CartItem.objects.create(cart=cart, product=self.product, quantity=1)
        self.assertEqual(cart.items.count(), 1)
        self.assertEqual(cart_item.product, self.product)
        self.assertEqual(cart_item.quantity, 1)

    def test_cart_total_price(self):
        cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=cart, product=self.product, quantity=2)
        self.assertEqual(cart.get_total_price(), 20.00)

class OrderModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.product = Product.objects.create(name='Test Product', description='A test description', price=10.00)

    def test_order_creation(self):
        order = Order.objects.create(user=self.user, total_price=10.00, shipping_address='123 Test St')
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.total_price, 10.00)

    def test_order_str(self):
        order = Order.objects.create(user=self.user, total_price=10.00, shipping_address='123 Test St')
        self.assertEqual(str(order), f'Order {order.id} by {self.user.username}')

    def test_add_item_to_order(self):
        order = Order.objects.create(user=self.user, total_price=10.00, shipping_address='123 Test St')
        order_item = OrderItem.objects.create(order=order, product=self.product, quantity=1, price=self.product.price)
        self.assertEqual(order.items.count(), 1)
        self.assertEqual(order_item.product, self.product)
        self.assertEqual(order_item.quantity, 1)

class ViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.product = Product.objects.create(name='Test Product', description='A test description', price=10.00)

    def test_add_to_cart_view(self):
        self.client.login(username='testuser', password='testpassword')
        response = self.client.get(reverse('add_to_cart', args=[self.product.pk]))
        self.assertEqual(response.status_code, 302) # Redirects to product_list
        cart = Cart.objects.get(user=self.user)
        self.assertEqual(cart.items.count(), 1)
        self.assertEqual(cart.items.first().product, self.product)

    # Note: Testing the full Stripe checkout flow is complex and usually involves mock objects
    # or a dedicated testing environment for Stripe. This test will only cover the initial
    # redirection to Stripe.
    def test_checkout_view_redirects_to_stripe(self):
        self.client.login(username='testuser', password='testpassword')
        cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=cart, product=self.product, quantity=1)
        
        response = self.client.post(reverse('checkout'))
        self.assertEqual(response.status_code, 303) # Redirects to Stripe
        self.assertIn('https://checkout.stripe.com', response.url)