from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Custom User Model to support Members and Admins
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username

# Book Model for Library
class Book(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    available = models.BooleanField(default=True)
    rentee = models.ForeignKey(
        "CustomUser", on_delete=models.SET_NULL, null=True, blank=True, related_name="rented_books"
    )

    def __str__(self):
        return self.title


# Rental Model to Track Book Rentals
class Rental(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    member = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rented_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)

    class Meta():
        ordering = ['-rented_at']

    def return_book(self):
        """ Marks a book as returned. """
        self.returned_at = timezone.now()

        self.book.available = True
        self.book.rentee = None
        self.book.save()
        self.save()

    def __str__(self):
        return f"{self.member.username} rented {self.book.title}"
