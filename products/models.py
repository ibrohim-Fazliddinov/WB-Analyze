from django.db import models


class ProductModel(models.Model):
    articul = models.IntegerField(primary_key=True, null=False, blank=False)
    name = models.CharField(max_length=500, verbose_name="Название Товара")

    brand = models.CharField(max_length=500, blank=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)

    rating = models.FloatField()
    review_count = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Все товары"
