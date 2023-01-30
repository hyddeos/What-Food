from django.contrib.auth import get_user_model, authenticate, get_user
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView, RedirectView, UpdateView

from django.views.decorators.csrf import csrf_exempt # Added
import json # Added
from django.http import JsonResponse # Added
from django.http import HttpResponse # Added
from rest_framework.response import Response # Added
from rest_framework.authtoken.models import Token # Added
from django.http import JsonResponse # Added 
from rest_framework import status # Added
from django.contrib.auth.decorators import login_required #Added

from whatfood.users.models import Family, Dish, Ingredients, Dishes_chosen, Shoppinglist, User as CurrentUser

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):

    model = User
    fields = ["name"]
    success_message = _("Information successfully updated")

    def get_success_url(self):
        assert (
            self.request.user.is_authenticated
        )  # for mypy to know that the user is authenticated
        return self.request.user.get_absolute_url()

    def get_object(self):
        return self.request.user

user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()

@csrf_exempt
def loginUser(request):
    """
    Log in the user
    """

    if request.method == "POST":
        # Attempt to sign user in
        request = json.loads(request.body.decode('utf-8'))
        username = request['username']['username']
        password = request['password']['password']

        user = authenticate(username=username, password=password)
        if user != None:
            print("User is logged in:", user)
            token = Token.objects.get(user=user)
            data = {
                "status": 202,
                "token": token.key,
                "username": username,          
            }
            return JsonResponse(data)
        else:
            print("loggin failed")
            data = {
                "status": 400,
            }
            return JsonResponse(data)

@csrf_exempt
def chosen_dishes(request):
    """
    Save dishes that the user wants to eat
    """

    if request.method == "POST":
        request = json.loads(request.body.decode('utf-8'))
        dishes = request['dishes']
        token = request['token']
        # Get the user from the token
        user = CurrentUser.objects.get(username=Token.objects.get(key=token).user)
        # Get the users Family
        family = Family.objects.get(member=user.pk)
        current_dishes = Dishes_chosen.objects.get(family=family)
        # Update with the new list
        current_dishes.dishes_chosen.set(dishes)
        current_dishes.save()

        """ LATER ADD THAT Dishes_chosen automaticly gets an input
            when family is created
        """

        data = {
            "status": 200,           
        }
        return JsonResponse(data)
    else:
        # ERROR for some reason
        data = {
            "status": 400,           
        }
        return JsonResponse(data)

@csrf_exempt
def update_shoppinglist(request):
    """
    Update the items on the shopping list
    """

    if request.method == "POST":
        request = json.loads(request.body.decode('utf-8'))
        token = request['token']
        # Get the user from the token
        user = CurrentUser.objects.get(username=Token.objects.get(key=token).user)
        # Get the users Family
        family = Family.objects.get(member=user.pk)
        current_shoppinglist = Shoppinglist.objects.get(family=family)
        # Diffent incoming data, from various components / views
        preshop_ingredients =  request.get('preshop_ingredients')
        shoppinglist_ingredients = request.get('ingredients_added')
        reset =  request.get('reset')
        # If request comes from Preshop-view
        if preshop_ingredients != None:
            ingredients = request['preshop_ingredients']
            # Update with the new list
            current_shoppinglist.ingredients.set(ingredients)
            current_shoppinglist.save()

        # If request comes from Shoppinglist-view
        elif shoppinglist_ingredients != None:
            ingredients_added = request['ingredients_added']
            # Update with the new list
            current_shoppinglist.ingredients_added.set(ingredients_added)
            current_shoppinglist.save()
        
        # Reset all Dishes etc   
        elif reset == 1:
            # Chosen Dishes
            current_dishes = Dishes_chosen.objects.get(family=family)
            current_dishes.dishes_chosen.clear()
            current_dishes.save()
            # Preshop
            current_shoppinglist.ingredients.clear()
            # Shoppinglist
            current_shoppinglist.ingredients_added.clear()
            
        data = {
            "status": 200,           
        }
        return JsonResponse(data)
    else:
        # ERROR for some reason
        data = {
            "status": 400,           
        }
        return JsonResponse(data)

@csrf_exempt
def add_dish(request):
    
    if request.method == "POST":
        request = json.loads(request.body.decode('utf-8'))
        token = request['token']
        # Get the user from the token
        user = CurrentUser.objects.get(username=Token.objects.get(key=token).user)
        # Get the users Family
        family = Family.objects.get(member=user.pk)
        print(request)
        # Get data about the dish
        name, ingredients = request['name'], request['ingredients']
        # Check if so there is data in them
        if name and ingredients:
            print("true")
            newdish = Dish(name=name, creator=family)
            newdish.save()
            for ingredient in ingredients:
                item = Ingredients(name=ingredient)
                item.save()
                newdish = Dish.objects.filter(name=name, creator=family).first()
                newdish.ingredients.add(item)
            print("new", newdish, newdish.ingredients)
                

            data = {"status": 200}
            return JsonResponse(data)

        else:
            data = {"status": 400}
            return JsonResponse(data)

    
    data = {"status": 400}
    return JsonResponse(data)

    