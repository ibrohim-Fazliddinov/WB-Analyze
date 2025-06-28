from django_filters import rest_framework as filters
from .models import ProductModel


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr="gte")
    min_review_count = filters.NumberFilter(
        field_name="review_count", lookup_expr="gte"
    )

    class Meta:
        model = ProductModel
        fields = ["min_price", "max_price", "min_rating", "min_review_count"]
