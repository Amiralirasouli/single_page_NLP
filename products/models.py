from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Model(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    api_endpoint = models.URLField()  # اضافه کردن فیلد آدرس API

    def __str__(self):
        return self.name


class Rating(models.Model):
    model = models.ForeignKey(Model, on_delete=models.CASCADE)
    rating = models.IntegerField()
    ip_address = models.CharField(max_length=45)  # برای ذخیره آی‌پی آدرس
