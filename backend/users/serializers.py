from rest_framework import serializers
from .models import User,Post,Comment,Like,SavedPosts

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
    class Meta:
        model = SavedPosts
        fields = '__all__'