from django.contrib import admin
from .models import User, Post, Chats, Like, Friend
# Register your models here.

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Chats)
admin.site.register(Like)
admin.site.register(Friend)