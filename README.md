# WB‑Analyze

**Аналитика товаров Wildberries**

---

## 🚀 Быстрый запуск (локально)

```bash

# Установить зависимости
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Настроить БД (SQLite или PostgreSQL в settings.py)
python manage.py migrate
python manage.py runserver  # бэкенд на http://localhost:8000

# Собрать фронтенд
npm install --force (могут быть ошибки, но вы не обращайте внимание)
npm run dev  # фронтенд запустится на http://localhost:3000 
```

🧰 Что включает проект
```python manage.py service``` - начинает парсинг, за раз парит 100 товаров.
- REST‑API /api/products/ с фильтрацией (min_price, min_rating, min_review_count)

- React‑интерфейс: таблица товаров + гистограмма цен + график «скидка vs рейтинг»

📦 Технологии
Backend: Django, DRF, django‑filters

Frontend: React, Axios, Recharts

База: SQLite (по умолчанию)
