from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.

class User(AbstractUser):
    phone_number = models.CharField(max_length=200)
    image = models.ImageField(null=True)
    banner = models.ImageField(null=True)
    about = models.CharField(null=True)
    def __str__(self):
        return self.username

class Post(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    image = models.ImageField(upload_to='image')
    description = models.CharField()
    date_posted = models.DateTimeField(default=timezone.now)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    comment = models.CharField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_date = models.DateTimeField(default=timezone.now)

class Like(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete = models.CASCADE)

class SavedPosts(models.Model):
    post = models.ForeignKey(Post, on_delete= models.CASCADE)
    user = models.ForeignKey(User, on_delete= models.CASCADE)