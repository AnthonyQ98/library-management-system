from django.shortcuts import render

from rest_framework import viewsets
from .serializers import LmsSerializer, MemberSerializer, UserSerializer
from .models import Book, Member

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# Create your views here.

class BookView(viewsets.ModelViewSet):
    serializer_class = LmsSerializer
    queryset = Book.objects.all()

class MemberView(viewsets.ModelViewSet):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()

class LoginView(APIView):
       def post(self, request):
           username = request.data.get('username')
           password = request.data.get('password')
           user = authenticate(username=username, password=password)
           if user:
               refresh = RefreshToken.for_user(user)
               return Response({
                   'refresh': str(refresh),
                   'access': str(refresh.access_token),
                   'user': UserSerializer(user).data
               })
           return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
