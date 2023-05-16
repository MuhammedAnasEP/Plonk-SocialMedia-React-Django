from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView
from admins import views



urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='Token_obtai_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='Token_refresh'),
    path('getusers/',views.getUsers),
    path('blockuser/<int:id>',views.userBlock),
]