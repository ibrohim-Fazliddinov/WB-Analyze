from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView

from products.filters import ProductFilter
from products.models import ProductModel
from products.serializer import ProductsSerializer


class ListProductsView(ListAPIView):
    serializer_class = ProductsSerializer
    # queryset = ProductModel.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    # filterset_fields = ['price', 'rating', 'review_count']

    def get_queryset(self):
        qs = ProductModel.objects.all()
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)
        # аналогично для рейтинга и отзывов:
        min_rating = self.request.query_params.get("min_rating")
        if min_rating:
            qs = qs.filter(rating__gte=min_rating)
        min_review_count = self.request.query_params.get("min_review_count")
        if min_review_count:
            qs = qs.filter(review_count__gte=min_review_count)
        return qs
