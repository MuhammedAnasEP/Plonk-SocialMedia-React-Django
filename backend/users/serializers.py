from rest_framework import serializers
from .models import User,Post,Comment,Like,SavedPosts,Friend,Chats,Messages,Notifications

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class SavedSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    user = UserSerializer()
    class Meta:
        model = SavedPosts
        fields = '__all__'

class FriendsSeriazer(serializers.ModelSerializer):
    user = UserSerializer()
    follow_user = UserSerializer()
    class Meta:
        model = Friend
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chats
        fields = "__all__"

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"

class NotificationSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    class Meta:
        model = Notifications
        fields = "__all__"