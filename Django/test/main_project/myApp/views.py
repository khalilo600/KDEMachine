from django.shortcuts import render, redirect
from .models import Book

def book_list(request):
    books = Book.objects.all()
    return render(request, 'myApp/book_list.html', {'books': books})

def add_book(request):
    if request.method == 'POST':
        title = request.POST['title']
        author = request.POST['author']
        price = request.POST['price']
        quantity = request.POST['quantity']
        Book.objects.create(title=title, author=author, price=price, quantity=quantity)
        return redirect('book_list')
    return render(request, 'myApp/add_book.html')
