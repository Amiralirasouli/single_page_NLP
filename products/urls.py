from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ModelViewSet,ModelRatingView , RateModelView, IndexView , get_categories, get_models_by_category

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'models', ModelViewSet)
# router.register(r'ratings', ModelRatingView)

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('', include(router.urls)),
    path('api/categories/', get_categories, name='get_categories'),
    path('api/models/<int:category_id>/', get_models_by_category, name='get_models_by_category'),
    path('rate_model/', RateModelView.as_view(), name='rate_model'),
    path('api/model_rating/<int:model_id>/', ModelRatingView.as_view(), name='model_rating'),
]
