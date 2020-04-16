from django.contrib import admin
from .models import Gym, Instructor, FitnessClass, Borough, Comment

# Register your models here.
admin.site.register(Gym)
admin.site.register(Instructor)
admin.site.register(FitnessClass)
admin.site.register(Borough)
admin.site.register(Comment)
