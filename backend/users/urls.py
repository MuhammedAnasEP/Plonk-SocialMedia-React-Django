from django.urls import path
from users import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView


urlpatterns = [
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='Token_obtai_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='Token_refresh'),
    path('signup/',views.Signup, name='signup_view'),
    path('postimage/<int:id>',views.PostImage, name='postimage_view'),
    path('getpost/',views.getPost,name='getPost'),
    path('comment/',views.addComment),
    path('getcomments/',views.getComments),
    path('like/',views.Likes),
    path('getlike/',views.getLike),
    path('savepost/',views.Save),
    path('getsavedposts/',views.getSavedPosts),
    path('editprofile/<int:id>',views.editProfile),
    path('getusers/',views.getUser),
    path('changepassword/<int:id>',views.changePassword),
    path('editpost/<int:id>',views.editPost),
    path('delete/<int:id>',views.deletePost)
]