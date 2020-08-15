# interface/urls.py
from django.conf.urls import url
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path(r'', views.index0, ),
   # path('charts/', views.charts),
   #  path('api/', views.ChartData.as_view()), 
    path('home/', views.home, name='home'),
    path('g_docs/', views.g_docs, name='about'),
    path('react/', views.react, name='reactApp'),

]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
