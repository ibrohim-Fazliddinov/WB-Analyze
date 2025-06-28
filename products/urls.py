from django.urls import path
from products.views import ListProductsView

urlpatterns = [path("products/", ListProductsView.as_view(), name="product-list")]
