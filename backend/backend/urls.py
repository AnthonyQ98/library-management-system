"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from lms import views
from lms.views import LoginView, RentBookView, MeView, ReturnBookView, RegisterView, RenteeView

router = routers.DefaultRouter()
router.register(r'manage', views.AdminBookView, 'manage')
router.register(r'books', views.MemberBookView, 'books')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/books/<int:book_id>/rent/", RentBookView.as_view(), name="rent-book"),
    path("api/books/<int:book_id>/return/", ReturnBookView.as_view(), name="return-book"),
    path("api/users/me/", MeView.as_view(), name="me"),
    path("api/user/<int:id>/", RenteeView.as_view(), name="get-user-by-id"),
]