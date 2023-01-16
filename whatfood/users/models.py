from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from django.db import models # Added


class User(AbstractUser):
    """
    Default custom user model for whatfoodproject.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    #: First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore

    def get_family(self):
        return f'{Family.objects.get(member=self.pk).name}'

    def get_dishes(self):
        family = Family.objects.get(member=self.pk)
        family_dishes = Dish.objects.filter(creator=family)
        dishes = []
        for dish in family_dishes:
            dishes.append({
                "id": dish.pk, 
                "name": dish.name,
                "ingredients": dish.ingredients.values()
                })
        return dishes

    def get_chosen_dishes(self):
        family = Family.objects.get(member=self.pk)
        chosen_dishes = Dishes_chosen.objects.filter(family=family)
        # Get the PK for all the chosen dishes
        dishes_pk = []
        for dish in chosen_dishes:
            dishes_pk.append(dish.dishes_chosen.values('pk'))
        # Get the dishes and add the ingredients
        dishes_with_ingredents = []
        for dish in dishes_pk[0]:
            temp_dish = Dish.objects.get(pk=dish['pk'])
            dishes_with_ingredents.append({
                "id": temp_dish.pk,
                "name": temp_dish.name,
                "ingredients": temp_dish.ingredients.values(),
            })
        
        return dishes_with_ingredents


    def get_shoppinglist(self):
        family = Family.objects.get(member=self.pk)
        shoppinglist = Shoppinglist.objects.get(family=family)        
        shoppinglists = {
            "id": shoppinglist.pk,
            "ingredients": shoppinglist.ingredients.values(),
            "ingredients_added": shoppinglist.ingredients_added.values()
        }
        return shoppinglists


    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"username": self.username})


class Family(models.Model):
    name = models.CharField(max_length=32)
    member = models.ManyToManyField(User, verbose_name=("Family Member"))

    def __str__(self) -> str:
        return f'{self.pk}, {self.name}'

class Ingredients(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f'{self.pk}, {self.name},'
    

class Dish(models.Model):
    name =  models.CharField(max_length=78, verbose_name=("The Dish"))
    creator = models.ForeignKey(Family, verbose_name=("Dish Owner"), on_delete=models.CASCADE)
    ingredients = models.ManyToManyField(Ingredients)

    def __str__(self) -> str:
        return f'{self.pk}, {self.name}, {self.ingredients.values_list()}'

class Dishes_chosen(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, default=0)
    dishes_chosen = models.ManyToManyField(Dish, verbose_name=("Dishes To Shop"), blank=True)

    def __str__(self) -> str:
        return f'pk: {self.pk}, fam: {self.family} {self.dishes_chosen.all()}'


class Shoppinglist(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE, default=0)
    ingredients = models.ManyToManyField(Ingredients, verbose_name=("Items to shop"), blank=True)
    ingredients_added = models.ManyToManyField(Ingredients, verbose_name=("Items in basket"), related_name=("Basket"), blank=True)

    def __str__(self) -> str:
        return f'pk: {self.pk}, fam: {self.family}'








