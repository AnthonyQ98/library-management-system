from rest_framework import serializers
from .models import Book

class LmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'description', 'available', 'rentee')