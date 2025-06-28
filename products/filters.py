from django_filters import rest_framework as filters
from .models import ProductModel

class ProductFilter(filters.FilterSet):
    """
    Набор фильтров для модели ProductModel, применяемый к API списку товаров.

    Поддерживаемые параметры фильтрации:
    - min_price: минимальная цена товара
    - max_price: максимальная цена товара
    - min_rating: минимальный рейтинг товара
    - min_review_count: минимальное количество отзывов

    Пример использования:
        /api/products/?min_price=1000&max_price=10000&min_rating=4.2&min_review_count=50
    """

    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr="gte")
    min_review_count = filters.NumberFilter(field_name="review_count", lookup_expr="gte")

    class Meta:
        model = ProductModel
        fields = ["min_price", "max_price", "min_rating", "min_review_count"]
