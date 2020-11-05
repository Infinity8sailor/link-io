from django.conf.urls import url
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('', views.index ),
   # path('public/world.json',views.world),

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)