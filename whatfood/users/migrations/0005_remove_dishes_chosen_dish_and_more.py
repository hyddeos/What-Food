# Generated by Django 4.1.4 on 2022-12-26 10:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_dishes_chosen"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="dishes_chosen",
            name="dish",
        ),
        migrations.AddField(
            model_name="dishes_chosen",
            name="dishes_chosen",
            field=models.ManyToManyField(
                to="users.dish", verbose_name="Dishes To Shop"
            ),
        ),
        migrations.AddField(
            model_name="dishes_chosen",
            name="family",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                to="users.family",
            ),
        ),
        migrations.CreateModel(
            name="Checklist",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("checklist", models.ManyToManyField(to="users.dishes_chosen")),
                (
                    "family",
                    models.ForeignKey(
                        default=0,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="users.family",
                    ),
                ),
            ],
        ),
    ]
