from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT

from .models import FitnessClass, Borough, Gym, Comment
# from .serializers import InstructorSerializer
from .serializers import FitnessClassSerializer, BoroughSerializer, PopulateFitnessClassSerializer, GymSerializer, CommentSerializer

# Create your views here.
class AllFitnessClassView(ListCreateAPIView):
  queryset = FitnessClass.objects.all()
  serializer_class = FitnessClassSerializer

  def get(self, request):
    fitness_classes = FitnessClass.objects.all()
    serializer = PopulateFitnessClassSerializer(fitness_classes, many=True)
    return Response(serializer.data)

class FitnessClassDetailView(RetrieveUpdateDestroyAPIView):
  queryset = FitnessClass.objects.all()
  serializer_class = FitnessClassSerializer

  def get(self, request, pk):
    fitness_class = FitnessClass.objects.get(pk=pk)
    serializer = PopulateFitnessClassSerializer(fitness_class)
    return Response(serializer.data)

class AllBoroughView(ListCreateAPIView):
  queryset = Borough.objects.all()
  serializer_class = BoroughSerializer

  def get(self, request):
    boroughs = Borough.objects.all()
    serializer = BoroughSerializer(boroughs, many=True)
    return Response(serializer.data)

class BoroughDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Borough.objects.all()
  serializer_class = BoroughSerializer

  def get(self, request, pk):
    borough = Borough.objects.get(pk=pk)
    serializer = BoroughSerializer(borough)
    return Response(serializer.data)

class AllGymView(ListCreateAPIView):
  queryset = Gym.objects.all()
  serializer_class = GymSerializer

  def get(self, request):
    gyms = Gym.objects.all()
    serializer = GymSerializer(gyms, many=True)
    return Response(serializer.data)

class GymDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Gym.objects.all()
  serializer_class = GymSerializer

  def get(self, request, pk):
    gym = Gym.objects.get(pk=pk)
    serializer = GymSerializer(gym)
    return Response(serializer.data)

class AllCommentView(ListCreateAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer

  def get(self, request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

class CommentDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer

  def get(self, request, pk):
    comment = Comment.objects.get(pk=pk)
    serializer = CommentSerializer(comment)
    return Response(serializer.data)