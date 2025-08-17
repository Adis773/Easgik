"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreateClientForm } from "./create-client-form"
import { Plus, User, Phone, Mail, MapPin, CreditCard } from "lucide-react"

// Mock clients data
const mockClients = [
  {
    id: "CLIENT-001",
    firstName: "Иван",
    lastName: "Иванов",
    middleName: "Иванович",
    phone: "+7 (999) 111-22-33",
    email: "ivanov@example.com",
    passport: {
      series: "1234",
      number: "567890",
      issuedBy: "ОУФМС России по г. Москве",
      issuedDate: "2015-05-15",
    },
    address: "г. Москва, ул. Ленина, д. 10, кв. 25",
    snils: "123-456-789 00",
    activeOrders: 2,
    completedOrders: 5,
    totalEarnings: 45000,
  },
  {
    id: "CLIENT-002",
    firstName: "Мария",
    lastName: "Петрова",
    middleName: "Сергеевна",
    phone: "+7 (999) 333-44-55",
    email: "petrova@example.com",
    passport: {
      series: "2345",
      number: "678901",
      issuedBy: "ОУФМС России по г. Москве",
      issuedDate: "2018-03-20",
    },
    address: "г. Москва, пр. Мира, д. 45, кв. 12",
    snils: "234-567-890 11",
    activeOrders: 1,
    completedOrders: 3,
    totalEarnings: 28000,
  },
]

export function PartnerClients() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [clients, setClients] = useState(mockClients)

  if (showCreateForm) {
    return <CreateClientForm onBack={() => setShowCreateForm(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Мои контрагенты</h3>
          <p className="text-sm text-gray-600">Управление физическими заказчиками работ</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить контрагента
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {client.lastName} {client.firstName} {client.middleName}
                  </CardTitle>
                  <CardDescription>Контрагент #{client.id}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{client.activeOrders} активных</Badge>
                  <Badge variant="secondary">{client.completedOrders} завершено</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{client.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span className="text-sm text-gray-900">{client.address}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Паспортные данные</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Заполнено
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Серия и номер: {client.passport.series} {client.passport.number}
                  </p>
                  <p>СНИЛС: {client.snils}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-900">Общий заработок с клиента</span>
                <span className="font-bold text-blue-900 flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  {client.totalEarnings.toLocaleString()} ₽
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Редактировать
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  История заказов
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {clients.length === 0 && (
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="text-center py-12">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет контрагентов</h3>
                <p className="text-gray-600 mb-4">Добавьте первого контрагента для работы с заказами</p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить контрагента
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
