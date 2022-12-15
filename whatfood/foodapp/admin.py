from django.contrib import admin

from .models import Family, Dish, Ingredients

# Register your models here.
admin.site.register(Family)
admin.site.register(Dish)
admin.site.register(Ingredients)