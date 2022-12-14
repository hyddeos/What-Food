from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from whatfood.users.forms import UserAdminChangeForm, UserAdminCreationForm

from whatfood.users.models import Family, Dish, Ingredients, Dishes_chosen, Shoppinglist



User = get_user_model()

admin.site.register(Family)
admin.site.register(Dish)
admin.site.register(Ingredients)
admin.site.register(Dishes_chosen)
admin.site.register(Shoppinglist)



@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ["username", "name", "is_superuser"]
    search_fields = ["name"]
