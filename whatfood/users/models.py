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
        fam = Family.objects.get(member=self.pk)
        dishes = Dish.objects.filter(creator=fam).values()
        return dishes

    def get_dishes_chosen(self):
        return Dishes_chosen.objects.all()

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
        return f'{self.pk}, {self.name},'

class Dishes_chosen(models.Model):
    dish = models.ForeignKey(Dish, verbose_name=("Dish chosen by User"), on_delete=models.CASCADE)





