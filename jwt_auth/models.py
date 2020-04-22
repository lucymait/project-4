from django.db import models
from django.contrib.auth.models import AbstractUser
# # Create your models here.
class User(AbstractUser):
  image = models.ImageField(upload_to='profile_image', blank=True)
  email = models.EmailField(unique=True, error_messages={'unique':"This email has already been registered."})