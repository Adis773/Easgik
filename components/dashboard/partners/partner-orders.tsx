"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreateOrderForm } from "./create-order-form"
import { Plus, Building2, MapPin, Hash, RussianRubleIcon as Ruble, Clock, Check, X } from "lucide-react"

// Mock partner orders data
const mockOrders = [
  {
    id: "PART-001",
    service: "Технический план",
    cadastralNumber: "77:01:0001001:1234",
    address: "г. Москва, ул. Ленина, д. 10, кв. 25",
    client: "Иванов И.И.",
    status: "pending_calculation",
    price: null,
    createdDate: "2024-01-18T10:00:00Z",
    comments: "Срочный заказ, нужно выполнить до конца месяца",
  },
  {
    id: "PART-002",
    service: "Межевой план",
    cadastralNumber: "77:01:0002001:5678",
    address: "г. Москва, пр. Мира, д. 45",
    client: "Петрова М.С.",
    status: "calculated",
    price: 25000,
    createdDate: "2024-01-17T14:30:00Z",
    comments: "Участок сложной формы",
  },
  {
    id: "PART-003",
    service: "Топографическая съемка",
    cadastralNumber: "77:01:0003001:9012",
    address: "г. Москва, ул. Садовая, д. 78",
    client: "Сидоров А.В.",
    status: "accepted",
    price: 35000,
    createdDate: "2024-01-16T09:15:00Z",
    comments: "",
  },
  {
    id: "PART-004",
    service: "Вынос границ",
    cadastralNumber: "77:01:0004001:3456",
    address: "г. Москва, ул. Новая, д. 12",
    client: "Козлов Д.П.",
    status: "rejected",
    price: 18000,
    createdDate: "2024-01-15T16:45:00Z",
    comments: "Не подходят сроки выполнения",
  },
]

export function PartnerOrders() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [orders, setOrders] = useState(mockOrders)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_calculation":
        return <Badge variant="secondary">Идет расчет стоимости работ</Badge>
      case "calculated":
        return <Badge variant="default">Готово к принятию</Badge>
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Принято
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Отклонено</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "accepted" } : order)))
  }

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "rejected" } : order)))
  }

  if (showCreateForm) {
    return <CreateOrderForm onBack={() => setShowCreateForm(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Список заявок</h3>
          <p className="text-sm text-gray-600">Управление заказами для ваших контрагентов</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Создать заявку
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {order.service}
                  </CardTitle>
                  <CardDescription>Заявка #{order.id}</CardDescription>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Адрес</p>
                  <p className="text-sm text-gray-900 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    {order.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Кадастровый номер</p>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    {order.cadastralNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Контрагент</p>
                  <p className="text-sm text-gray-900">{order.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Дата создания</p>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(order.createdDate).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>

              {order.price && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 flex items-center gap-2">
                    <Ruble className="w-4 h-4" />
                    Стоимость работ: {order.price.toLocaleString()} ₽
                  </p>
                </div>
              )}

              {order.comments && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Комментарии</p>
                  <p className="text-sm text-gray-600">{order.comments}</p>
                </div>
              )}

              {order.status === "calculated" && (
                <div className="flex gap-2">
                  <Button onClick={() => handleAcceptOrder(order.id)} className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Принять предложение
                  </Button>
                  <Button variant="outline" onClick={() => handleRejectOrder(order.id)} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Отказаться
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {orders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Нет активных заявок</h3>
              <p className="text-gray-600 mb-4">Создайте первую заявку для ваших контрагентов</p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Создать заявку
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
