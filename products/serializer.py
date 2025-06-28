from rest_framework.serializers import ModelSerializer

from products.models import ProductModel


class ProductsSerializer(ModelSerializer):
    class Meta:
        model = ProductModel
        fields = (
            "articul",
            "name",
            "price",
            "discounted_price",
            "rating",
            "review_count",
            "brand",
        )
