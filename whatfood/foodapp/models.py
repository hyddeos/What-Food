from django.db import models
from users.models import User

# Create your models here.
class Family(models.Model):
    name = models.CharField(max_length=32)
    member = models.ForeignKey(User, verbose_name=("Family Member"), on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.pk}, {self.name}, {self.member},'

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
