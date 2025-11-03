from django.urls import path
from .views import ProductListView, ProductDetailView, register, add_to_cart, cart_view, product_create, product_update, checkout_view, order_history_view, stripe_success_view, stripe_cancel_view

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product_detail'),
    path('register/', register, name='register'),
    path('add_to_cart/<int:pk>/', add_to_cart, name='add_to_cart'),
    path('cart/', cart_view, name='cart'),
    path('create/', product_create, name='product_create'),
    path('<int:pk>/update/', product_update, name='product_update'),
    path('checkout/', checkout_view, name='checkout'),
    path('orders/', order_history_view, name='order_history'),
    path('stripe_success/', stripe_success_view, name='stripe_success'),
    path('stripe_cancel/', stripe_cancel_view, name='stripe_cancel'),
]
