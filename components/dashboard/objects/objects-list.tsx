"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ObjectDetails } from "./object-details"
import { Building2, MapPin, Hash, Calendar, RussianRubleIcon as Ruble } from "lucide-react"

// Mock data - replace with actual CRM data
const mockObjects = [
  {
    id: "OBJ-001",
    address: "г. Москва, ул. Ленина, д. 10, кв. 25",
    cadastralNumber: "77:01:0001001:1234",
    status: "В работе",
    statusColor: "blue",
    workType: "Технический план",
    manager: {
      name: "Петров Алексей Сергеевич",
      phone: "+7 (999) 111-22-33",
      email: "petrov@company.com",
    },
    engineer: "Сидоров И.П.",
    surveyor: "Козлов А.В.",
    visitDate: "2024-01-20",
    visitTime: "10:00",
    cost: 15000,
    progress: 60,
  },
  {
    id: "OBJ-002",
    address: "г. Москва, пр. Мира, д. 45, кв. 12",
    cadastralNumber: "77:01:0002001:5678",
    status: "Ожидает документы",
    statusColor: "yellow",
    workType: "Межевой план",
    manager: {
      name: "Иванова Мария Петровна",
      phone: "+7 (999) 333-44-55",
      email: "ivanova@company.com",
    },
    engineer: "Николаев В.С.",
    surveyor: "Федоров Д.М.",
    visitDate: "2024-01-25",
    visitTime: "14:00",
    cost: 25000,
    progress: 30,
  },
  {
    id: "OBJ-003",
    address: "г. Москва, ул. Садовая, д. 78",
    cadastralNumber: "77:01:0003001:9012",
    status: "Завершено",
    statusColor: "green",
    workType: "Топографическая съемка",
    manager: {
      name: "Смирнов Дмитрий Александрович",
      phone: "+7 (999) 555-66-77",
      email: "smirnov@company.com",
    },
    engineer: "Морозов К.Л.",
    surveyor: "Волков С.Н.",
    visitDate: "2024-01-15",
    visitTime: "09:00",
    cost: 18000,
    progress: 100,
  },
]

export function ObjectsList() {
  const [selectedObject, setSelectedObject] = useState<string | null>(null)

  const getStatusVariant = (color: string) => {
    switch (color) {
      case "blue":
        return "default"
      case "yellow":
        return "secondary"
      case "green":
        return "outline"
      default:
        return "default"
    }
  }

  if (selectedObject) {
    const object = mockObjects.find((obj) => obj.id === selectedObject)
    if (object) {
      return <ObjectDetails object={object} onBack={() => setSelectedObject(null)} />
    }
  }

  return (
    <div className="space-y-4">
      {mockObjects.map((object) => (
        <Card key={object.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {object.workType}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {object.address}
                </CardDescription>
              </div>
              <Badge variant={getStatusVariant(object.statusColor)}>{object.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Кадастровый номер</p>
                <p className="text-sm text-gray-900 flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {object.cadastralNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Менеджер</p>
                <p className="text-sm text-gray-900">{object.manager.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Дата выезда</p>
                <p className="text-sm text-gray-900 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(object.visitDate).toLocaleDateString("ru-RU")} в {object.visitTime}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Стоимость</p>
                <p className="text-sm text-gray-900 flex items-center gap-1">
                  <Ruble className="w-3 h-3" />
                  {object.cost.toLocaleString()} ₽
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Прогресс выполнения</span>
                <span>{object.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${object.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setSelectedObject(object.id)} className="flex-1">
                Подробнее
              </Button>
              <Button variant="outline">Чат с менеджером</Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {mockObjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет активных объектов</h3>
            <p className="text-gray-600 mb-4">У вас пока нет заказанных объектов</p>
            <Button>Заказать услугу</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
