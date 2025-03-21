from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    available = models.BooleanField(default=True)
    rentee = models.TextField(default="")


    def _str_(self):
        return self.title
