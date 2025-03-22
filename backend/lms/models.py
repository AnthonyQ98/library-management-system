from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    available = models.BooleanField(default=True)
    rentee = models.TextField(default="")


    def _str_(self):
        return self.title
    

class Member(models.Model):
    name = models.CharField(max_length=60)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    active = models.BooleanField(default=True)


    def _str_(self):
        return self.name
    
class User(models.Model):
    name = models.CharField(max_length=60)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    active = models.BooleanField(default=True)


    def _str_(self):
        return self.name

