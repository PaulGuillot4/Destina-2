from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import include
 
urlpatterns = [
    path('pruebas/', PruebaListApiView.as_view(), name='clientes-api-list'),
 
]

