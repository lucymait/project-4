from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT

from rest_framework import permissions
from rest_framework.permissions import BasePermission, IsAuthenticated

from .models import FitnessClass, Borough, Gym, Comment
from .serializers import FitnessClassSerializer, BoroughSerializer, PopulateFitnessClassSerializer, GymSerializer, CommentSerializer

# Create your views here.

class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True
    
    return request.user == obj.user


class AllFitnessClassView(APIView):
  # queryset = FitnessClass.objects.all()
  # serializer = FitnessClassSerializer
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request):
    fitness_classes = FitnessClass.objects.all()
    self.check_object_permissions(request, fitness_classes)
    serializer = PopulateFitnessClassSerializer(fitness_classes, many=True)
    return Response(serializer.data)


class FitnessClassDetailView(APIView):
  # queryset = FitnessClass.objects.all()
  # serializer_class = FitnessClassSerializer
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request, pk):
    fitness_class = FitnessClass.objects.get(pk=pk)
    self.check_object_permissions(request, fitness_class)
    serializer = PopulateFitnessClassSerializer(fitness_class)
    return Response(serializer.data)

class AllBoroughView(APIView):
  # queryset = Borough.objects.all()
  # serializer_class = BoroughSerializer

  def get(self, request):
    boroughs = Borough.objects.all()
    serializer = BoroughSerializer(boroughs, many=True)
    return Response(serializer.data)

class BoroughDetailView(APIView):
  # queryset = Borough.objects.all()
  # serializer_class = BoroughSerializer
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request, pk):
    borough = Borough.objects.get(pk=pk)
    self.check_object_permissions(request, borough)
    serializer = BoroughSerializer(borough)
    return Response(serializer.data)

class AllGymView(APIView):
  # queryset = Gym.objects.all()
  # serializer_class = GymSerializer

  def get(self, request):
    gyms = Gym.objects.all()
    serializer = GymSerializer(gyms, many=True)
    return Response(serializer.data)

class GymDetailView(APIView):
  # queryset = Gym.objects.all()
  # serializer_class = GymSerializer
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request, pk):
    gym = Gym.objects.get(pk=pk)
    self.check_object_permissions(request, gym)
    serializer = GymSerializer(gym)
    return Response(serializer.data)

class AllCommentView(APIView):
  # queryset = Comment.objects.all()
  # serializer_class = CommentSerializer

  def get(self, request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

class CommentDetailView(APIView):
  # queryset = Comment.objects.all()
  # serializer_class = CommentSerializer

  def get(self, request, pk):
    comment = Comment.objects.get(pk=pk)
    serializer = CommentSerializer(comment)
    return Response(serializer.data)