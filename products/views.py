import requests
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Model, Rating
from .serializers import CategorySerializer, ModelSerializer, RatingSerializer
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from django.db.models import Avg


class IndexView(TemplateView):
    template_name = 'index.html'


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer

    @action(detail=True, methods=['post'])
    def predict(self, request, pk=None):
        model = self.get_object()
        text = request.data.get('text')
        try:
            response = requests.post(model.api_endpoint, json={'text': text})
            response.raise_for_status()  # بررسی وضعیت پاسخ
            return Response(response.json())
        except requests.exceptions.RequestException as e:
            return Response({'error': 'API request failed', 'details': str(e)}, status=500)


class ModelRatingView(APIView):
    def get(self, request, model_id):
        average_rating = Rating.objects.filter(model_id=model_id).aggregate(Avg('rating'))['rating__avg']
        return Response({'average_rating': average_rating})


class RateModelView(APIView):
    def post(self, request):
        model_id = request.data.get('model_id')
        rating = request.data.get('rating')
        ip_address = request.META.get('REMOTE_ADDR')

        # بررسی اینکه آیا آی‌پی قبلاً امتیاز داده است یا نه
        if Rating.objects.filter(model_id=model_id, ip_address=ip_address).exists():
            return Response({'success': False, 'message': 'You have already rated this model.'}, status=400)

        # ذخیره امتیاز جدید
        Rating.objects.create(model_id=model_id, rating=rating, ip_address=ip_address)
        return Response({'success': True})

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_models_by_category(request, category_id):
    models = Model.objects.filter(category_id=category_id)
    serializer = ModelSerializer(models, many=True)
    return Response(serializer.data)
