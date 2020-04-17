from django.urls import path
from .views import AllFitnessClassView, FitnessClassDetailView, BoroughDetailView, AllBoroughView, AllGymView, GymDetailView, CommentDetailView, AllCommentView, BookedClassesView, BookedClassDetailView

urlpatterns = [
  path('', AllFitnessClassView.as_view()),
  path('<int:pk>/', FitnessClassDetailView.as_view()),
  path('borough/', AllBoroughView.as_view()),
  path('borough/<int:pk>/', BoroughDetailView.as_view()),
  path('gym/', AllGymView.as_view()),
  path('gym/<int:pk>/', GymDetailView.as_view()),
  path('comment/', AllCommentView.as_view()),
  path('comment/<int:pk>/', CommentDetailView.as_view()),
  path('bookedclass/', BookedClassesView.as_view()),
  path('bookedclass/<int:pk>/', BookedClassDetailView.as_view())
]