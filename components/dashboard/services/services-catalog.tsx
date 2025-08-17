"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServiceOrderForm } from "./service-order-form"
import { FileText, Map, MapPin, Compass, Mountain, Plus, Clock, RussianRubleIcon as Ruble } from "lucide-react"

// Mock services data - replace with actual CRM data
const services = [
  {
    id: "tech-plan",
    name: "Технический план",
    description:
      "Подготовка технического плана на квартиру, дом или нежилое помещение для регистрации права собственности",
    icon: FileText,
    price: { from: 12000, to: 18000 },
    duration: "5-7 рабочих дней",
    features: [
      "Выезд кадастрового инженера",
      "Обмерные работы",
      "Подготовка технического плана",
      "Согласование в Росреестре",
    ],
    popular: true,
  },
  {
    id: "boundary-plan",
    name: "Межевой план",
    description: "Межевание земельного участка для определения и закрепления границ на местности",
    icon: Map,
    price: { from: 20000, to: 35000 },
    duration: "7-10 рабочих дней",
    features: [
      "Полевые геодезические работы",
      "Определение координат границ",
      "Установка межевых знаков",
      "Подготовка межевого плана",
    ],
    popular: true,
  },
  {
    id: "land-scheme",
    name: "Схема ЗУ на КПТ",
    description: "Схема расположения земельного участка на кадастровом плане территории",
    icon: MapPin,
    price: { from: 8000, to: 15000 },
    duration: "3-5 рабочих дней",
    features: ["Подготовка схемы расположения", "Согласование границ", "Оформление документов", "Подача в Росреестр"],
    popular: false,
  },
  {
    id: "boundary-marking",
    name: "Вынос границ",
    description: "Вынос границ земельного участка в натуру с установкой межевых знаков",
    icon: Compass,
    price: { from: 15000, to: 25000 },
    duration: "1-2 рабочих дня",
    features: ["Геодезические работы", "Установка межевых знаков", "Составление акта выноса", "Фотофиксация границ"],
    popular: false,
  },
  {
    id: "topographic-survey",
    name: "Топографическая съемка",
    description: "Топографическая съемка участка для проектирования и строительства",
    icon: Mountain,
    price: { from: 25000, to: 50000 },
    duration: "5-7 рабочих дней",
    features: [
      "Полевые топографические работы",
      "Съемка рельефа и объектов",
      "Подготовка топоплана",
      "Цифровая модель местности",
    ],
    popular: false,
  },
  {
    id: "custom",
    name: "Другие услуги",
    description: "Индивидуальные геодезические и кадастровые работы по вашим требованиям",
    icon: Plus,
    price: { from: 10000, to: 100000 },
    duration: "По согласованию",
    features: ["Индивидуальный подход", "Консультация специалиста", "Расчет стоимости", "Гибкие сроки выполнения"],
    popular: false,
  },
]

export function ServicesCatalog() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  if (selectedService) {
    const service = services.find((s) => s.id === selectedService)
    if (service) {
      return <ServiceOrderForm service={service} onBack={() => setSelectedService(null)} />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
          {service.popular && (
            <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600">Популярно</Badge>
          )}
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <service.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
              </div>
            </div>
            <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Стоимость:</span>
                <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  <Ruble className="w-4 h-4" />
                  {service.price.from === service.price.to
                    ? service.price.from.toLocaleString()
                    : `${service.price.from.toLocaleString()} - ${service.price.to.toLocaleString()}`}{" "}
                  ₽
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Срок:</span>
                <span className="text-sm text-gray-900 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Что включено:</p>
              <ul className="space-y-1">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={() => setSelectedService(service.id)} className="w-full">
              Заказать услугу
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
