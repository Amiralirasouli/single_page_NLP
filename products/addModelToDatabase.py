# درون یک فایل اسکریپت پایتون یا از طریق shell:
# script.py
from .models import Category, Model

# category = Category.objects.create(name="NER")  To add category * when use it who dont create category yet
Model.objects.create(category="NER", name="A1", api_endpoint="http://localhost:8000/inference")
category = Category.objects.get(name="NER")