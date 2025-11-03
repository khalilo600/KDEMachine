from django.urls import path
from .views import BookListView, BookDetailView, add_to_cart, cart_detail, book_search, BookCreateView, BookUpdateView, BookDeleteView, checkout, order_history

urlpatterns = [
    path('', BookListView.as_view(), name='book_list'),
    path('book/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('add-to-cart/<int:pk>/', add_to_cart, name='add_to_cart'),
    path('cart/', cart_detail, name='cart_detail'),
    path('search/', book_search, name='book_search'),
    path('book/new/', BookCreateView.as_view(), name='book_new'),
    path('book/<int:pk>/edit/', BookUpdateView.as_view(), name='book_edit'),
    path('book/<int:pk>/delete/', BookDeleteView.as_view(), name='book_delete'),
    path('checkout/', checkout, name='checkout'),
    path('orders/', order_history, name='order_history'),
]