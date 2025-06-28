from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView

from products.filters import ProductFilter
from products.models import ProductModel
from products.serializer import ProductsSerializer


class ListProductsView(ListAPIView):
    """
    API endpoint для получения списка товаров с поддержкой фильтрации.

    Поддерживаемые параметры фильтрации (GET query params):
    - min_price: минимальная цена товара (например, min_price=5000)
    - max_price: максимальная цена товара (например, max_price=10000)
    - min_rating: минимальный рейтинг товара (например, min_rating=4.5)
    - min_review_count: минимальное количество отзывов (например, min_review_count=100)

    Пример запроса:
        GET /api/products/?min_price=5000&min_rating=4.5

    Ответ:
        Список товаров, удовлетворяющих условиям фильтрации, в JSON-формате.
    """

    queryset = ProductModel.objects.all()
    serializer_class = ProductsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter



