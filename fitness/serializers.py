from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Comment, FitnessClass, Borough, Gym, Instructor, BookedClass

class InstructorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Instructor
    fields = ('id', 'name')

class BoroughSerializer(serializers.ModelSerializer):
  class Meta:
    model = Borough
    fields = ('id', 'name', 'image')

class GymSerializer(serializers.ModelSerializer):
  class Meta:
    model = Gym
    # borough is a foregin key - one per gym
    fields = ('id', 'name', 'facilities')

class CommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Comment
    fields = ('id', 'text')

class FitnessClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'borough', 'instructor', 'time_of_class', 'description', 'comment')

class PopulateFitnessClassSerializer(serializers.ModelSerializer):
  borough = BoroughSerializer()
  instructor = InstructorSerializer()
  gym = GymSerializer()
  comment = CommentSerializer(many=True)
  user = UserSerializer()

  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'borough', 'instructor', 'time_of_class', 'description', 'comment')

class BookedClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = BookedClass
    fields = ('id', 'name', 'gym', 'activity_type', 'borough', 'instructor', 'time_of_class', 'description', 'user', 'data_booked')

# class PopulateBookedClassSerializer(serializers.ModelSerializer):

#   class Meta:
#     model = BookedClass
#     fields = ('id', 'booked_class', 'user')


