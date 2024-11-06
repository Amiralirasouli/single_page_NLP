from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ModelViewSet, RatingViewSet, IndexView , get_categories

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'models', ModelViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('', include(router.urls)),
    path('api/categories/', get_categories, name='get_categories'),
]
