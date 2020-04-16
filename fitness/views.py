from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_202_ACCEPTED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT

from .models import FitnessClass
# from .serializers import InstructorSerializer, GymSerializer, FitnessClassSerializer, CommentSerializer, BoroughSerializer
from .serializers import FitnessClassSerializer

# Create your views here.
class AllFitnessClassView(ListCreateAPIView):
  queryset = FitnessClass.objects.all()
  serializer_class = FitnessClassSerializer

  def get(self, request):
    fitness_classes = FitnessClass.objects.all()
    serializer = FitnessClassSerializer(fitness_classes, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = FitnessClassSerializer(data=request.data)
    if serializer.is_valid():
      serialzer.save()
      return Response(serializer.data, status=HTTP_202_ACCEPTED)

    return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class FitnessClassDetailView(RetrieveUpdateDestroyAPIView):
  queryset = FitnessClass.objects.all()
  serializer_class = FitnessClassSerializer

  def get(self, request, pk):
    fitness_class = FitnessClass.objects.get(pk=pk)
    serializer = FitnessClassSerializer(fitness_class)
    return Response(serializer.data)


    