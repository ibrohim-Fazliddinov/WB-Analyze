import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WB Analyze - Система анализа товаров",
  description: "Профессиональная система анализа и фильтрации товаров с интерактивными диаграммами и статистикой",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6" />
                <span className="font-bold text-xl">WB Analyze</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/" className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Главная</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/api" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>API</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
