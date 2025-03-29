from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.generics import RetrieveAPIView

from .models import Book, Rental, CustomUser
from .serializers import BookSerializer, RentalSerializer, UserSerializer

# ==========================
# ADMIN VIEWS
# ==========================

class AdminBookView(viewsets.ModelViewSet):
    """ Admins can perform full CRUD on books """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]  # Only Admins can manage books


# ==========================
# MEMBER VIEWS
# ==========================

class MemberBookView(viewsets.ReadOnlyModelViewSet):
    """ Members can only view books """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Any logged-in user can view books


class RentBookView(APIView):
    """ Members can rent a book if available """
    permission_classes = [IsAuthenticated]

    def put(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        
        if not book.available:
            return Response({"error": "Book is already rented"}, status=400)

        book.available = False
        book.rentee = request.user  # Assuming a ForeignKey to User model
        book.save()

        return Response(BookSerializer(book).data)

    def post(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)

        if not book.available:
            return Response({"error": "Book is already rented."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure rental entry is created
        rental = Rental.objects.create(book=book, member=request.user, rented_at=timezone.now())

        book.available = False
        book.rentee = request.user
        book.save()

        return Response(RentalSerializer(rental).data, status=status.HTTP_201_CREATED)


class ReturnBookView(APIView):
    """ Members can return a book they have rented """
    permission_classes = [IsAuthenticated]

    def put(self, request, book_id):
        rental = get_object_or_404(Rental, book_id=book_id, member=request.user, returned_at=None)
        
        if rental.book.available:
            return Response({"error": "Book is available! Can't return."}, status=400)

        rental.returned_at = timezone.now()
        rental.book.available = True
        rental.book.rentee = None
        rental.book.save()
        rental.save()

        return Response({"message": "Book returned successfully"}, status=status.HTTP_200_OK)

    def post(self, request, book_id):
        rental = get_object_or_404(Rental, book_id=book_id, member=request.user, returned_at=None)

        rental.returned_at = timezone.now()
        rental.book.available = True
        rental.book.rentee = None
        rental.book.save()
        rental.save()

        return Response({"message": "Book returned successfully"}, status=status.HTTP_200_OK)


# ==========================
# AUTHENTICATION
# ==========================

class LoginView(APIView):
    """ Handles user login and returns JWT tokens """
    permission_classes = [AllowAny]

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
    
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to register

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if CustomUser.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(username=username, password=password, email=email)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    
class MeView(APIView):
    """ Returns details of the currently logged-in user """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)

class RenteeView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "id"  # Default is pk, but just to be explicit