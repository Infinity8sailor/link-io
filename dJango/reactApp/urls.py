from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
    path('public/world.json',views.world),
    path('public/plane.json',views.world),
    path('public/flare-2.json',views.flare),

]