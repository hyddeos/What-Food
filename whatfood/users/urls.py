from django.urls import path

from whatfood.users.views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
    loginUser,
    chosen_dishes,
    update_shoppinglist
)

app_name = "users"
urlpatterns = [
    path("login/", view=loginUser, name="Login User"),
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("data/chosendishes/", view=chosen_dishes, name="choshen dishes"),
    path("data/shoppinglist/", view=update_shoppinglist, name="shoppinglist"),
    path("<str:username>/", view=user_detail_view, name="detail"),    
]
