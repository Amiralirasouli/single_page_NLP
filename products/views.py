import requests
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Model, Rating
from .serializers import CategorySerializer, ModelSerializer, RatingSerializer
from django.views.generic import TemplateView
from rest_framework.decorators import api_view

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


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)