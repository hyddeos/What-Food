from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "get_family", "get_dishes", "get_chosen_dishes"]


        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "username"},
        }
