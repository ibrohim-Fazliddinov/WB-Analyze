from decimal import Decimal

import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from products.models import ProductModel


class Command(BaseCommand):
    help = "Загружает данные с Wildberries и сохраняет в БД"

    def handle(self, *args, **options):
        url = "https://recom.wb.ru/personal/sng/common/v5/search"
        headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "sec-ch-ua": '"Google Chrome";v="123", "Chromium";v="123", "Not:A-Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "sec-fetch-dest": "document",
            "referer": "https://google.com/",
            "origin": "https://google.com",
            "connection": "keep-alive",
            "upgrade-insecure-requests": "1"
        }
        params = {
            "ab_testing": "false",
            "appType": "1",
            "curr": "rub",
            "dest": "491",
            "hide_dtype": "13",
            "lang": "ru",
            "page": "1",
            "query": "0",
            "resultset": "catalog",
            "spp": "30",
            "suppressSpellcheck": "false",
        }
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        products = data.get("data", {}).get("products", [])

        with transaction.atomic():
            objs = []
            for item in products:
                # 1) Берём первый size (если он есть)
                sizes = item.get("sizes") or []
                if sizes:
                    price_info = sizes[0].get("price", {})
                    basic_cents = price_info.get("basic", 0)
                    product_cents = price_info.get("product", 0)
                else:
                    basic_cents = product_cents = 0

                # 2) Рейтинг и отзывы на уровне item
                rating = float(item.get("rating", 0))
                review_count = int(item.get("feedbacks", 0))

                objs.append(
                    ProductModel(
                        articul=int(item["id"]),
                        name=item.get("name", "")[:500],
                        brand=item.get("brand", "")[:500],
                        price=Decimal(basic_cents) / 100,  # basic → Decimal рубли
                        discounted_price=Decimal(product_cents)
                        / 100,  # product → рубли
                        rating=rating,
                        review_count=review_count,
                    )
                )

            ProductModel.objects.bulk_create(objs, ignore_conflicts=True)

            self.stdout.write(self.style.SUCCESS(f"Сохранено {len(objs)} товаров"))
