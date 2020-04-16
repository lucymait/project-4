from rest_framework import serializers
from .models import Comment, FitnessClass, Borough, Gym, Instructor

class InstructorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Instructor
    fields = ('id', 'name')

class BoroughSerializer(serializers.ModelSerializer):
  class Meta:
    model = Borough
    fields = ('id', 'name', 'image', 'fitnessclass')

class GymSerializer(serializers.ModelSerializer):
  class Meta:
    model = Gym
    # borough is a foregin key - one per gym
    fields = ('id', 'name', 'facilites')

class CommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Comment
    fields = ('id', 'text', 'user')

class FitnessClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'borough', 'instructor', 'time_of_class', 'description', 'comment')