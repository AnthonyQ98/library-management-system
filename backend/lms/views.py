from django.shortcuts import render

from rest_framework import viewsets
from .serializers import LmsSerializer
from .models import Book

# Create your views here.

class LmsView(viewsets.ModelViewSet):
    serializer_class = LmsSerializer
    queryset = Book.objects.all()
