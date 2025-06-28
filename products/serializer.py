from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer

from products.models import ProductModel

class ProductsSerializer(ModelSerializer):
    discount_percent = SerializerMethodField()

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
            "discount_percent",
        )

    def get_discount_percent(self, obj):
        return obj.discount_percent