# Generated by Django 4.2 on 2023-05-13 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_user_about'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='banner',
            field=models.ImageField(default=None, upload_to=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default=None, upload_to=''),
        ),
    ]