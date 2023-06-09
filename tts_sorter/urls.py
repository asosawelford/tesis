from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

# URLConf
urlpatterns = [
    path('hello/', views.say_hello),
    path('receive_form/', csrf_exempt(views.receive_form)),
]