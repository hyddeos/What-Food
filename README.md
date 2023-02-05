# WhatFood!?

## Get a shopping list with only what you really need, based on your own recipes.
### Works in 3-steps. 1, Choose what dishes you want to eat. 2, Check what ingredients you already have at home. 3, Go shopping with your newly generated list.
<img src="https://user-images.githubusercontent.com/39992041/216849360-e3409181-ff9b-49ea-8401-3d080cd7584e.png" width="400"/>
<img src="https://user-images.githubusercontent.com/39992041/216849539-189cb8a4-008d-4730-ba35-77da005adc9a.png" width="400"/>
<img src="https://user-images.githubusercontent.com/39992041/216849453-477c409a-1edf-4f9b-8cec-31ae31b2ca36.png" width="400"/>

## Created using Django with cookiecutter, React and Tailwind

### Features:
* Create Users
* Create Families
* Add multiple users to a family that share dishes and lists
* Add and Remove dishes

## Try it out [Here](https://whatfood.eshtropy.se/)
```
user: demo
pw: Testnunu
```

### TODO:
* Possibility to edit dishes(instead of remove and create a new)
* Settings to turn off Preshopping step
* Add single items
* Add possibility for more users shopping at the same time(with sockets or a simple refresh button)

## Background
This app was created from the way we generally do our shopping already. We typically write down what we want to eat for dishes. Then we try to remember what ingredients are needed for the dishes and then(when we remember) we cross off the stuff we already have at home. So hopefully now with this app we can save a lot of time!

# How to run

## Backend Django with Cookiecutter

[![Built with Cookiecutter Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg?logo=cookiecutter)](https://github.com/cookiecutter/cookiecutter-django/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)

License: MIT

## Settings

Moved to [settings](http://cookiecutter-django.readthedocs.io/en/latest/settings.html).

## Basic Commands

### Setting Up Your Users

-   To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

-   To create a **superuser account**, use this command:

        $ python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

### Type checks

Running type checks with mypy:

    $ mypy whatfood

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report:

    $ coverage run -m pytest
    $ coverage html
    $ open htmlcov/index.html

#### Running tests with pytest

    $ pytest

### Live reloading and Sass CSS compilation

Moved to [Live reloading and SASS compilation](https://cookiecutter-django.readthedocs.io/en/latest/developing-locally.html#sass-compilation-live-reloading).

## Deployment

The following details how to deploy this application.

## Frontend React
Install React:

	pip install react

React Beautiful Drag n Drop:

	npm install react-beautiful-dnd --save


### Start the App:
Start the django server from the project root with:

	python3 manage.py runserver 

Move into frontend-folder to start react:

	npm start
(if the page does not open automatically visit http://localhost:3000/ in the browser)

