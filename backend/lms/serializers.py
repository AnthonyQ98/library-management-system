from rest_framework import serializers
from .models import Book, Rental, CustomUser

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'description', 'author', 'genre', 'available', 'rentee')

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('id', 'book', 'member', 'rented_at', 'returned_at')

class UserSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField() 
    class Meta:
        model = CustomUser
        fields = ('id', 'address', 'phone_number', 'username', 'email', 'first_name', 'last_name', 'is_staff')