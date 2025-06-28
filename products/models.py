from django.db import models

class ProductModel(models.Model):
    """
    Модель товара, полученного с Wildberries.
    Сохраняет ключевые параметры товара для аналитики и отображения.
    """

    articul = models.IntegerField(primary_key=True, null=False, blank=False)  # артикул WB
    name = models.CharField(max_length=500, verbose_name="Название товара")

    brand = models.CharField(max_length=500, blank=True, verbose_name="Бренд")

    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена без скидки")
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена со скидкой")

    rating = models.FloatField(verbose_name="Рейтинг", db_index=True)
    review_count = models.IntegerField(verbose_name="Количество отзывов", db_index=True)

    def __str__(self):
        return self.name

    @property
    def discount_percent(self):
        """Возвращает размер скидки в процентах."""
        if self.price > 0:
            return round((1 - self.discounted_price / self.price) * 100)
        return 0

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Все товары"
        ordering = ['-rating']  # по умолчанию сортировать по рейтингу (можно изменить)
