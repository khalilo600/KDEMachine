from django import template

register = template.Library()

@register.filter
def calculate_cart_total(cart_items):
    total = 0
    for item in cart_items:
        total += item['total_price']
    return total
