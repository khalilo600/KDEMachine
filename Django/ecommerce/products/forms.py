from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Product # Import Product model

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ('email',)

class SearchForm(forms.Form):
    query = forms.CharField(label='Search', max_length=100)

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price']

class CheckoutForm(forms.Form):
    shipping_address = forms.CharField(widget=forms.Textarea, label='Shipping Address')
