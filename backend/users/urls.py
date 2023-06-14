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
    path('unlike/',views.Unlike),
    path('getlike/',views.getLike),
    path('savepost/',views.Save),
    path('unsavepost/',views.Unsave),
    path('getsavedposts/',views.getSavedPosts),
    path('editprofile/<int:id>',views.editProfile),
    path('getusers/',views.getUser),
    path('getallusers/',views.getAllUsers),
    path('changepassword/<int:id>',views.changePassword),
    path('editpost/<int:id>',views.editPost),
    path('deletepost/<int:id>',views.deletePost),
    path('deletecomment/<int:id>',views.deleteComment),
    path('follow/<int:id>',views.Follow),
    path('friendslist/',views.FriendsList),
    path('addchat/<int:sender>/<int:receiver>',views.addChat),
    path('getchat/<int:id>',views.getChats),
    path('sendmessage/<int:sender>/<int:receiver>',views.sendMessage),
    path('getonechat/<int:sender>/<int:receiver>',views.getOneChat),
    path('getmessages/<int:id>',views.getMessages),
    path('getfollowings/<int:id>',views.getFollowings),
    path('savedpost/<int:id>',views.savedPosts),
    path('getnotifications/<int:id>',views.getNotifications),
    path('unfollow/<int:id>/<int:follow_user>',views.Unfollow),
    path('checkfriend/<int:id>/<int:follow_user>',views.checkFriend),
    path('isliked/<int:userId>/<int:postId>',views.isLiked),
    path('emailVerification/',views.EmailVeirification),
    path('changeemail/<int:id>',views.ChangeEmail),
    path('markasread/',views.markasRead)
]