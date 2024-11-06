from django.contrib import admin
from .models import Category, Model, Rating

# تعریف کلاس برای نمایش مدل‌ها در پنل ادمین
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Model)
class ModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'api_endpoint')
    search_fields = ('name', 'description')
    list_filter = ('category',)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'model', 'rating')
    search_fields = ('model__name',)
    list_filter = ('rating',)
