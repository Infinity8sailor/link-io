from django.urls import path
from . import views

urlpatterns = [
    path('reactapp/api/lead/', views.LeadListCreate.as_view() ),
]