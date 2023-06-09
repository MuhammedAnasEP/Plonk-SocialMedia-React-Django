from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User,Post,Comment,Like,SavedPosts,Friend,Notifications,Chats,Messages
from .serializers import UserSerializer,PostSerializer,CommentSerializer,LikeSerializer,SavedSerializer,FriendsSerializer,ChatSerializer,MessageSerializer,NotificationSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.conf import settings

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if user.is_active:
            token = super().get_token(user)
            return token
        else:
            return Response('username is not valid')
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
    return Response(routes)

@api_view(['POST'])
def Signup(request):  
    data = request.data
    firstname = data['firstname']
    lastname = data['lastname']
    username = data['username']
    email = data['email']
    password = make_password(data['password'])

    if User.objects.filter(username = username):
        return Response('username not available', status=status.HTTP_401_UNAUTHORIZED)
    
    if User.objects.filter(email = email):
        return Response("Already register with this email",status=status.HTTP_406_NOT_ACCEPTABLE)
   
    user = User.objects.create(first_name = firstname, last_name = lastname, username = username, email = email, password = password)
    serializer = UserSerializer(user, many = False)
    return Response(serializer.data)
   
@api_view(['POST'])
def PostImage(request,id):   
    data = request.data
    img = data['image']
    des = data['description']
    user = User.objects.get(id=id)
    post = Post.objects.create(user = user, image=img,  description = des)
    post.save()
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getPost(request):
    posts = Post.objects.all().order_by('-id')
    serialize = PostSerializer(posts, many=True)
    return Response(serialize.data)

@api_view(['POST'])
def addComment(request):
    user = request.data['user']
    post = request.data['post']
    comment = request.data['comment']
    user_id = User.objects.get(id = user)
    post_id = Post.objects.get(id = post)
    comments = Comment.objects.create(user = user_id, post=post_id, comment = comment)
    comments.save()
    message =' is commentd your post.'
    notification = Notifications.objects.create(sender = user_id, receiver = post_id.user, message = message)
    notification.save()
    return Response("Comment Added Succesfully")

@api_view(['GET'])
def getComments(request):
    comments = Comment.objects.all()
    serialize = CommentSerializer(comments, many = True)
    return Response(serialize.data)

@api_view(['POST'])
def Unlike(request):
    user=request.data['user']
    post=request.data['post']
    user_id = User.objects.get(id=user)
    post_id = Post.objects.get(id=post)
    likes=Like.objects.get(user = user_id, post = post_id)
    likes.delete()
    return Response("Unlikd")

@api_view(['POST'])
def Likes(request):
    user = request.data['user']
    post = request.data['post']        
    user_id = User.objects.get(id=user)
    post_id = Post.objects.get(id=post)        
    likes = Like.objects.create(user = user_id, post = post_id)
    likes.save()
    message =' is Liked your post.'
    notification = Notifications.objects.create(sender = user_id, receiver = post_id.user, message = message)
    notification.save()
    return Response("Liked")

@api_view(['GET'])
def getLike(request):
    likes = Like.objects.all()
    serialize = LikeSerializer(likes, many=True)
    return Response(serialize.data)

@api_view(['POST'])
def Save(request):
    try:
        id = request.data['saved_id']
        saved = SavedPosts.objects.get(id = id)
        saved.delete()
        return Response("Unsaved")
    except:
        user = request.data['user']
        post = request.data['post']
        user_id = User.objects.get(id=user)
        post_id = Post.objects.get(id=post)
        saved = SavedPosts.objects.create(user = user_id, post = post_id)
        saved.save()
        return Response("Saved")
    
@api_view(['POST'])
def Unsave(request):
    user = request.data['user']
    post = request.data['post']
    user_id = User.objects.get(id=user)
    post_id = Post.objects.get(id=post)
    saved = SavedPosts.objects.get(user = user_id, post = post_id)
    saved.delete()
    return Response("Unsaved")

@api_view(['GET'])
def getSavedPosts(requests):
    saved = SavedPosts.objects.all()
    serialize = SavedSerializer(saved, many = True)
    return Response(serialize.data) 

@api_view(['POST'])
def getUser(request):
    user = request.data["user_id"]
    users = User.objects.get(id = user)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def getAllUsers(request):
    users = User.objects.all().order_by('-id')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def editProfile(request, id):
    print("hhhhhhhjjjhhhhhhhhhhhhhhhhj")
    user = User.objects.get(id = id)
    username = request.data['username']
    user.first_name = request.data['firstname']
    user.last_name = request.data['lastname']
    if username != user.username:
        if User.objects.filter(username = username):
            return Response('username not available', status=status.HTTP_401_UNAUTHORIZED)
    user.username = request.data['username']
    user.about = request.data['about']
    user.image = request.data['profileImage']
    user.save()
    serialize = UserSerializer(user, many = False)
    return Response(serialize.data)

@api_view(['PUT'])
def changePassword(request,id):
    currentPassword = request.data['currentPassword']
    newPassword = make_password(request.data['newPassword'])
    user = User.objects.get(id = id)
    if not user.check_password(currentPassword):
        return Response("Invalid Password",status=status.HTTP_401_UNAUTHORIZED)
    user.password = newPassword
    user.save()
    return Response("Success")

@api_view(['PUT'])
def editPost(request, id):
    post = Post.objects.get(id = id)
    try:
        post.image = request.data['image']
        post.description = request.data['description']
        post.save()
    except:
        post.description = request.data['description']
        post.save()
    return Response("Post Edited")

@api_view(['POST'])
def deletePost(request,id):
    post = Post.objects.get(id = id)
    post.delete()
    return Response("Post Deleted")

@api_view(['PUT'])
def deleteComment(request, id):
    comment = Comment.objects.get(id=id)
    comment.delete()
    return Response('Comment deleted')

@api_view(['POST'])
def Follow(request, id):
    user = User.objects.get(id=id)
    too = request.data['to']
    to = User.objects.get(id=too)
    follow = Friend.objects.create(user = user, follow_user = to)
    follow.save()
    message =' is followed you.'
    notification = Notifications.objects.create(sender = user, receiver = to, message = message)
    notification.save()
    return Response("Followed")

@api_view(['GET'])
def FriendsList(request):
    friends = Friend.objects.all()
    serialize = FriendsSerializer(friends, many=True)
    return Response(serialize.data)

@api_view(['POST'])
def addChat(request,sender,receiver):
    try:
        send_user = User.objects.get(id = sender)
        receiver_user = User.objects.get(id = receiver)
        chat = Chats.objects.get(sender = send_user, receiver = receiver_user)
        serialize = ChatSerializer(chat, many = False)
        return Response(serialize.data)

    except:
        send_user = User.objects.get(id = sender)
        receiver_user = User.objects.get(id = receiver)
        chat = Chats.objects.create(sender = send_user, receiver = receiver_user)
        chat.save()
        serialize = ChatSerializer(chat, many = False)
        return Response(serialize.data)

@api_view(['GET'])
def getChats(request, id):
    chats = Chats.objects.filter(sender = id)
    serialize = ChatSerializer(chats, many = True)
    return Response(serialize.data)

@api_view(['POST'])
def sendMessage(request, sender, receiver):
    chat = Chats.objects.get(sender = sender, receiver = receiver)
    sender = User.objects.get(id = sender)
    content = request.data['message']
    message = Messages.objects.create(chat = chat, sender = sender, content = content)
    message.save()
    return Response("Success")

@api_view(['GET'])
def getOneChat(request, sender, receiver):
    chat = Chats.objects.get(sender = sender, receiver = receiver)
    serialze = ChatSerializer(chat, many = False)
    return Response(serialze.data)

@api_view(['GET'])
def getMessages(request, id):
    message = Messages.objects.filter(chat = id)
    serialze = MessageSerializer(message, many = True)
    return Response(serialze.data)

@api_view(['GET'])
def getFollowings(request, id):
    followng = Friend.objects.filter(user = id)
    serialze = FriendsSerializer(followng, many = True)
    return Response(serialze.data)

@api_view(['GET'])
def savedPosts(request, id):
    saved = SavedPosts.objects.filter(user = id)
    serialize = SavedSerializer(saved, many = True)
    return Response(serialize.data)

@api_view(['GET'])
def getNotifications(request, id):
    notifications = Notifications.objects.filter(receiver = id, is_read = False).order_by('-id')
    serialize = NotificationSerializer(notifications, many = True)
    return Response(serialize.data)

@api_view(['POST'])
def markasRead(request):
   noti = request.data['notification']
   notif = Notifications.objects.get(id = noti)
   notif.is_read = True
   notif.save()
   return Response()

@api_view(['PUT'])
def Unfollow(request, id, follow_user):
    friend = Friend.objects.filter(user = id, follow_user = follow_user)
    friend.delete()
    return Response('Unfollowed')

@api_view(['PUT'])
def checkFriend(request, id, follow_user):
    try:
        friend = Friend.objects.get(user = id, follow_user = follow_user)
        return Response(True)
    except:
        return Response(False)

@api_view(['GET'])
def isLiked(request, userId, postId):
    try:
        like = Like.objects.get(user = userId, post = postId)
        return Response(True)
    except:
        return Response(False)

@api_view(['POST'])
def EmailVeirification(request):
    recipient = request.data['email']
    if User.objects.filter(email = recipient):
        return Response("Already register with this email",status=status.HTTP_401_UNAUTHORIZED)
    else:   
        subject = 'Email varification for changing the email id'
        # message = 'click link for changing the email http://localhost:3000/email/'+recipient
        message = 'click link for changing the email https://www.plonk.live/email/'+recipient
        send_mail(subject, 
            message, settings.EMAIL_HOST_USER, [recipient], fail_silently=False)
        return Response("sended verification message")

@api_view(['PUT'])
def ChangeEmail(request,id):
    user = User.objects.get(id = id)
    email = request.data['email']
    user.email = email
    user.save()
    return Response("Success")