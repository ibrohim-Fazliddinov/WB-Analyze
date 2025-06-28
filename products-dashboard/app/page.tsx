"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowUpDown, ArrowUp, ArrowDown, Star, Loader2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Типы данных
interface Product {
  id: number
  name: string
  price: number
  discounted_price: number
  rating: number
  review_count: number
}

interface Filters {
  min_price: number
  max_price: number
  min_rating: number
  min_review_count: number
}

interface SortConfig {
  key: keyof Product | null
  direction: "asc" | "desc"
}

// Демонстрационные данные
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Смартфон Samsung Galaxy S23",
    price: 89990,
    discounted_price: 79990,
    rating: 4.5,
    review_count: 1250,
  },
  { id: 2, name: "Ноутбук MacBook Air M2", price: 129990, discounted_price: 119990, rating: 4.8, review_count: 890 },
  { id: 3, name: "Наушники Sony WH-1000XM5", price: 34990, discounted_price: 29990, rating: 4.7, review_count: 2100 },
  { id: 4, name: "Планшет iPad Pro 12.9", price: 109990, discounted_price: 99990, rating: 4.6, review_count: 750 },
  {
    id: 5,
    name: "Умные часы Apple Watch Series 9",
    price: 49990,
    discounted_price: 44990,
    rating: 4.4,
    review_count: 1800,
  },
  { id: 6, name: "Телевизор LG OLED 55", price: 159990, discounted_price: 139990, rating: 4.9, review_count: 450 },
  {
    id: 7,
    name: "Игровая консоль PlayStation 5",
    price: 54990,
    discounted_price: 49990,
    rating: 4.3,
    review_count: 3200,
  },
  { id: 8, name: "Фотоаппарат Canon EOS R6", price: 189990, discounted_price: 169990, rating: 4.8, review_count: 320 },
  { id: 9, name: "Робот-пылесос Xiaomi", price: 24990, discounted_price: 19990, rating: 4.2, review_count: 1500 },
  { id: 10, name: "Кофемашина Delonghi", price: 79990, discounted_price: 69990, rating: 4.1, review_count: 680 },
  { id: 11, name: "Микроволновка Panasonic", price: 15990, discounted_price: 12990, rating: 4.0, review_count: 950 },
  { id: 12, name: "Холодильник Bosch", price: 89990, discounted_price: 79990, rating: 4.6, review_count: 420 },
  { id: 13, name: "Стиральная машина LG", price: 64990, discounted_price: 54990, rating: 4.3, review_count: 780 },
  { id: 14, name: "Пылесос Dyson V15", price: 44990, discounted_price: 39990, rating: 4.7, review_count: 1100 },
  { id: 15, name: "Электрочайник Tefal", price: 4990, discounted_price: 3990, rating: 3.9, review_count: 2500 },
]

export default function ProductsDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })

  // Фильтры
  const [filters, setFilters] = useState<Filters>({
    min_price: 0,
    max_price: 200000,
    min_rating: 0,
    min_review_count: 0,
  })

  // Диапазоны для слайдеров
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [minRating, setMinRating] = useState(0)
  const [minReviewCount, setMinReviewCount] = useState(0)

  // Загрузка данных
  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/products/products/?max_price=${filters.max_price}&min_price=${filters.min_price}&min_rating=${filters.min_rating}&min_review_count=${filters.min_review_count}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
      setError("Не удалось загрузить данные с сервера. Используются демонстрационные данные.")

      // В случае ошибки API используем демонстрационные данные
      const filteredData = demoProducts.filter(
        (product) =>
          product.price >= filters.min_price &&
          product.price <= filters.max_price &&
          product.rating >= filters.min_rating &&
          product.review_count >= filters.min_review_count,
      )
      setProducts(filteredData)
    } finally {
      setLoading(false)
    }
  }

  // Применение фильтров
  const applyFilters = () => {
    setFilters({
      min_price: priceRange[0],
      max_price: priceRange[1],
      min_rating: minRating,
      min_review_count: minReviewCount,
    })
  }

  // Сортировка
  const handleSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedProducts = useMemo(() => {
    if (!sortConfig.key) return products

    return [...products].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [products, sortConfig])

  // Данные для диаграмм
  const priceDistribution = useMemo(() => {
    const ranges = [
      { range: "0-25k", min: 0, max: 25000 },
      { range: "25k-50k", min: 25000, max: 50000 },
      { range: "50k-75k", min: 50000, max: 75000 },
      { range: "75k-100k", min: 75000, max: 100000 },
      { range: "100k-150k", min: 100000, max: 150000 },
      { range: "150k+", min: 150000, max: Number.POSITIVE_INFINITY },
    ]

    return ranges.map((range) => ({
      range: range.range,
      count: products.filter((p) => p.price >= range.min && p.price < range.max).length,
    }))
  }, [products])

  const discountVsRating = useMemo(() => {
    return products
      .map((product) => ({
        rating: product.rating,
        discount: Math.round(((product.price - product.discounted_price) / product.price) * 100),
        name: product.name,
      }))
      .sort((a, b) => a.rating - b.rating)
  }, [products])

  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4" />
    }
    return sortConfig.direction === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">WB Analyze - Анализ товаров</h1>
        <p className="text-muted-foreground">Система анализа и фильтрации товаров с интерактивными диаграммами</p>
      </div>

      {/* Ошибка */}
      {error && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-yellow-800">
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
          <CardDescription>Настройте параметры для фильтрации товаров</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Слайдер цены */}
            <div className="space-y-3">
              <Label>
                Диапазон цен: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200000}
                min={0}
                step={1000}
                className="w-full"
                disabled={loading}
              />
            </div>

            {/* Минимальный рейтинг */}
            <div className="space-y-3">
              <Label>Минимальный рейтинг: {minRating}</Label>
              <Slider
                value={[minRating]}
                onValueChange={(value) => setMinRating(value[0])}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
                disabled={loading}
              />
            </div>

            {/* Минимальное количество отзывов */}
            <div className="space-y-3">
              <Label>Минимальное количество отзывов: {minReviewCount}</Label>
              <Slider
                value={[minReviewCount]}
                onValueChange={(value) => setMinReviewCount(value[0])}
                max={5000}
                min={0}
                step={50}
                className="w-full"
                disabled={loading}
              />
            </div>
          </div>

          <Button onClick={applyFilters} disabled={loading} className="w-full md:w-auto">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Применить фильтры
          </Button>
        </CardContent>
      </Card>

      {/* Таблица товаров */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Товары ({products.length})</span>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
          <CardDescription>Нажмите на заголовок колонки для сортировки</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <div className="text-muted-foreground">Загрузка данных...</div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-semibold">
                        Название товара
                        {getSortIcon("name")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("price")} className="h-auto p-0 font-semibold">
                        Цена
                        {getSortIcon("price")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("discounted_price")}
                        className="h-auto p-0 font-semibold"
                      >
                        Цена со скидкой
                        {getSortIcon("discounted_price")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("rating")} className="h-auto p-0 font-semibold">
                        Рейтинг
                        {getSortIcon("rating")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("review_count")}
                        className="h-auto p-0 font-semibold"
                      >
                        Количество отзывов
                        {getSortIcon("review_count")}
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <span
                          className={
                            product.price !== product.discounted_price ? "line-through text-muted-foreground" : ""
                          }
                        >
                          {formatPrice(product.price)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">{formatPrice(product.discounted_price)}</span>
                        {product.price !== product.discounted_price && (
                          <span className="ml-2 text-sm text-red-600">
                            (-{Math.round(((product.price - product.discounted_price) / product.price) * 100)}%)
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.review_count.toLocaleString("ru-RU")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Диаграммы */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Гистограмма цен */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение товаров по ценам</CardTitle>
            <CardDescription>Количество товаров в различных ценовых диапазонах</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Линейный график скидки vs рейтинг */}
        <Card>
          <CardHeader>
            <CardTitle>Размер скидки vs Рейтинг</CardTitle>
            <CardDescription>Зависимость размера скидки от рейтинга товара</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={discountVsRating}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name, props) => [`${value}%`, "Скидка"]}
                    labelFormatter={(value) => `Рейтинг: ${value}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="discount"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
