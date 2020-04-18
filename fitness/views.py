from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT

from rest_framework import permissions
from rest_framework.permissions import BasePermission, IsAuthenticated

from .models import FitnessClass, Borough, Gym, Comment, BookedClass
from .serializers import FitnessClassSerializer, BoroughSerializer, PopulateFitnessClassSerializer, GymSerializer, CommentSerializer, BookedClassSerializer, PopulateBoroughSerializer

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
    serializer = PopulateBoroughSerializer(boroughs, many=True)
    return Response(serializer.data)

class BoroughDetailView(APIView):
  # queryset = Borough.objects.all()
  # serializer_class = BoroughSerializer
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request, pk):
    borough = Borough.objects.get(pk=pk)
    self.check_object_permissions(request, borough)
    serializer = PopulateBoroughSerializer(borough)
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

class BookedClassesView(APIView):
  # queryset = BookedClass.objects.all()
  # serializer_class = BookedClassSerializer
  permissions_classes = (IsAuthenticated, )

  def post(self, request):
    request.data['user'] = request.user.id
    booked_class = BookedClassSerializer(data = request.data)
    if booked_class.is_valid():
      booked_class.save()
      return Response(booked_class.data, status=HTTP_202_ACCEPTED)
    
    return Response(status=HTTP_422_UNPROCESSABLE_ENTITY)

class BookedClassDetailView(APIView):

  def get(self, request, pk):
    booked_class = BookedClass.objects.get(pk=pk)
    serializer = BookedClassSerializer(booked_class)
    return Response(serializer.data)

  def delete(self, request, pk):

    booked_class = BookedClass.objects.get(pk=pk)
    booked_class.delete()
    return Response(status=HTTP_204_NO_CONTENT)
