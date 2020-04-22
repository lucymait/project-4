from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
User = get_user_model()
from django.conf import settings
import jwt
from .serializers import UserSerializer, PopulateUserSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated
# We could also use APIView, like the textbook, but CreateAPIView gives us a nicer form
class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        # This will run our custom validation code
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})
        return Response(serializer.errors, status=422)


class LoginView(APIView):
    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Not Registered'})
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        # Check if there's a user with this email.
        user = self.get_user(email)
        # If this password is not the same as the password saved for the user
        # check_password is given to us by django.
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Incorrect Password'})
        # Create a JWT for the user, and send it back
        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})
        
class ProfileView(APIView):
  permission_classes = (IsAuthenticated, )
  def get(self, request):
    user = User.objects.get(pk=request.user.id)
    serialized_user = PopulateUserSerializer(user)
    return Response(serialized_user.data)

  