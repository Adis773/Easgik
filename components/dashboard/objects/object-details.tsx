"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ManagerChat } from "./manager-chat"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Hash,
  User,
  Wrench,
  Calendar,
  RussianRubleIcon as Ruble,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react"

interface ObjectDetailsProps {
  object: {
    id: string
    address: string
    cadastralNumber: string
    status: string
    statusColor: string
    workType: string
    manager: {
      name: string
      phone: string
      email: string
    }
    engineer: string
    surveyor: string
    visitDate: string
    visitTime: string
    cost: number
    progress: number
  }
  onBack: () => void
}

export function ObjectDetails({ object, onBack }: ObjectDetailsProps) {
  const [showChat, setShowChat] = useState(false)

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

  const workStages = [
    { name: "Получение заявки", completed: true },
    { name: "Выезд на объект", completed: true },
    { name: "Проведение измерений", completed: object.progress >= 60 },
    { name: "Подготовка документов", completed: object.progress >= 80 },
    { name: "Согласование", completed: object.progress >= 100 },
    { name: "Передача документов", completed: object.progress >= 100 },
  ]

  if (showChat) {
    return <ManagerChat object={object} onBack={() => setShowChat(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к списку
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{object.workType}</h1>
          <p className="text-gray-600">Объект #{object.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Информация об объекте
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Адрес объекта</p>
                  <p className="text-sm text-gray-900 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    {object.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Кадастровый номер</p>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    {object.cadastralNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Вид работ</p>
                  <p className="text-sm text-gray-900">{object.workType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Статус</p>
                  <Badge variant={getStatusVariant(object.statusColor)}>{object.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Этапы выполнения работ</CardTitle>
              <CardDescription>Текущий прогресс: {object.progress}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${object.progress}%` }}
                  ></div>
                </div>
                <div className="space-y-3">
                  {workStages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          stage.completed ? "bg-green-500 border-green-500" : "border-gray-300 bg-white"
                        }`}
                      >
                        {stage.completed && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
                      </div>
                      <span className={`text-sm ${stage.completed ? "text-gray-900" : "text-gray-500"}`}>
                        {stage.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Специалисты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Кадастровый инженер</p>
                  <p className="text-sm text-gray-900">{object.engineer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Геодезист</p>
                  <p className="text-sm text-gray-900">{object.surveyor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Дата и время выезда</p>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(object.visitDate).toLocaleDateString("ru-RU")} в {object.visitTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Стоимость работ</p>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Ruble className="w-4 h-4" />
                    {object.cost.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Персональный менеджер
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-gray-900">{object.manager.name}</p>
                <p className="text-sm text-gray-600">Ведущий менеджер проекта</p>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{object.manager.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{object.manager.email}</span>
                </div>
              </div>
              <Separator />
              <Button onClick={() => setShowChat(true)} className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Написать в чат
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
