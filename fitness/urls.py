from django.urls import path
from .views import AllFitnessClassView, FitnessClassDetailView

urlpatterns = [
  path('', AllFitnessClassView.as_view()),
  path('<int:pk>/', FitnessClassDetailView.as_view()),
]