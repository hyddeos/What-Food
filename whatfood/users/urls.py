from django.urls import path

from django.views.decorators.csrf import csrf_exempt # added



from whatfood.users.views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
    loginUser,
)

app_name = "users"
urlpatterns = [
    path("login/", view=loginUser, name="Login User"),
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    
]
