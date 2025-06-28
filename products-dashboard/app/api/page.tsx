import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Filter, BarChart3 } from "lucide-react"

export default function ApiDocumentation() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">API Документация</h1>
        <p className="text-muted-foreground">Документация по API для системы анализа товаров WB Analyze</p>
      </div>

      {/* Обзор */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Обзор API</span>
          </CardTitle>
          <CardDescription>
            API предоставляет доступ к данным о товарах с возможностью фильтрации и сортировки
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4 text-blue-500" />
              <span className="text-sm">REST API</span>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-green-500" />
              <span className="text-sm">Фильтрация</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Аналитика</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-orange-500" />
              <span className="text-sm">JSON Response</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Основной эндпоинт */}
      <Card>
        <CardHeader>
          <CardTitle>Получение товаров</CardTitle>
          <CardDescription>Основной эндпоинт для получения списка товаров с фильтрацией</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-muted px-2 py-1 rounded">/api/products/products/</code>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Параметры запроса:</h4>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="font-medium">Параметр</div>
                <div className="font-medium">Тип</div>
                <div className="font-medium">Описание</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-t pt-2">
                <code>min_price</code>
                <span>number</span>
                <span>Минимальная цена товара</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <code>max_price</code>
                <span>number</span>
                <span>Максимальная цена товара</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <code>min_rating</code>
                <span>number</span>
                <span>Минимальный рейтинг (0-5)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <code>min_review_count</code>
                <span>number</span>
                <span>Минимальное количество отзывов</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Пример запроса:</h4>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                GET
                http://127.0.0.1:8000/api/products/products/?max_price=15429.00&min_price=4500.00&min_rating=1&min_review_count=31
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Структура ответа */}
      <Card>
        <CardHeader>
          <CardTitle>Структура ответа</CardTitle>
          <CardDescription>Формат данных, возвращаемых API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {`[
  {
    "id": 1,
    "name": "Название товара",
    "price": 89990,
    "discounted_price": 79990,
    "rating": 4.5,
    "review_count": 1250
  },
  {
    "id": 2,
    "name": "Другой товар",
    "price": 129990,
    "discounted_price": 119990,
    "rating": 4.8,
    "review_count": 890
  }
]`}
            </pre>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Описание полей:</h4>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="font-medium">Поле</div>
                <div className="font-medium">Тип</div>
                <div className="font-medium">Описание</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-2">
                <code>id</code>
                <span>number</span>
                <span>Уникальный идентификатор товара</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <code>name</code>
                <span>string</span>
                <span>Название товара</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <code>price</code>
                <span>number</span>
                <span>Первоначальная цена в рублях</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <code>discounted_price</code>
                <span>number</span>
                <span>Цена со скидкой в рублях</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <code>rating</code>
                <span>number</span>
                <span>Рейтинг товара (0-5)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <code>review_count</code>
                <span>number</span>
                <span>Количество отзывов</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Коды ответов */}
      <Card>
        <CardHeader>
          <CardTitle>HTTP коды ответов</CardTitle>
          <CardDescription>Возможные коды состояния HTTP</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge variant="default" className="bg-green-500">
                200
              </Badge>
              <span className="text-sm">Успешный запрос</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive">400</Badge>
              <span className="text-sm">Неверные параметры запроса</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive">500</Badge>
              <span className="text-sm">Внутренняя ошибка сервера</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Примеры использования */}
      <Card>
        <CardHeader>
          <CardTitle>Примеры использования</CardTitle>
          <CardDescription>Типичные сценарии использования API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Получить все товары:</h4>
            <div className="bg-muted p-3 rounded">
              <code className="text-sm">GET /api/products/products/</code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">2. Товары в ценовом диапазоне:</h4>
            <div className="bg-muted p-3 rounded">
              <code className="text-sm">GET /api/products/products/?min_price=10000&max_price=50000</code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">3. Товары с высоким рейтингом:</h4>
            <div className="bg-muted p-3 rounded">
              <code className="text-sm">GET /api/products/products/?min_rating=4.5</code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">4. Популярные товары:</h4>
            <div className="bg-muted p-3 rounded">
              <code className="text-sm">GET /api/products/products/?min_review_count=1000</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
