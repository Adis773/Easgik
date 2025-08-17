"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, RussianRubleIcon as Ruble, Clock } from "lucide-react"

interface ServiceOrderFormProps {
  service: {
    id: string
    name: string
    description: string
    price: { from: number; to: number }
    duration: string
    features: string[]
  }
  onBack: () => void
}

export function ServiceOrderForm({ service, onBack }: ServiceOrderFormProps) {
  const [formData, setFormData] = useState({
    cadastralNumber: "",
    address: "",
    customService: "",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call to CRM
      const orderData = {
        serviceId: service.id,
        serviceName: service.id === "custom" ? formData.customService : service.name,
        cadastralNumber: formData.cadastralNumber,
        address: formData.address,
        comments: formData.comments,
        estimatedPrice: service.price,
        duration: service.duration,
        timestamp: new Date().toISOString(),
      }

      console.log("Creating order:", orderData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Заказ создан успешно",
        description: `Заявка на "${service.name}" принята в работу. Менеджер свяжется с вами в ближайшее время.`,
      })

      // Redirect back to services or to objects page
      onBack()
    } catch (error) {
      console.error("Order creation error:", error)
      toast({
        title: "Ошибка создания заказа",
        description: "Произошла ошибка при создании заказа. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    if (service.id === "custom") {
      return formData.customService.trim() && formData.address.trim()
    }
    return formData.address.trim()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к каталогу
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заказ услуги</h1>
          <p className="text-gray-600">Заполните форму для создания заявки</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Информация о заказе</CardTitle>
              <CardDescription>Укажите детали для выполнения работ</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {service.id === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-service">Описание услуги *</Label>
                    <Textarea
                      id="custom-service"
                      placeholder="Опишите какие работы необходимо выполнить..."
                      value={formData.customService}
                      onChange={(e) => handleInputChange("customService", e.target.value)}
                      required
                      rows={3}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="cadastral-number">Кадастровый номер объекта</Label>
                  <Input
                    id="cadastral-number"
                    type="text"
                    placeholder="77:01:0001001:1234"
                    value={formData.cadastralNumber}
                    onChange={(e) => handleInputChange("cadastralNumber", e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-sm text-gray-500">Если кадастровый номер неизвестен, оставьте поле пустым</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Адрес объекта *</Label>
                  <Textarea
                    id="address"
                    placeholder="г. Москва, ул. Ленина, д. 10, кв. 25"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Комментарии</Label>
                  <Textarea
                    id="comments"
                    placeholder="Дополнительная информация, особые требования..."
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={!isFormValid() || isSubmitting} className="flex-1">
                    {isSubmitting ? "Создание заказа..." : "Создать заказ"}
                  </Button>
                  <Button type="button" variant="outline" onClick={onBack}>
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <service.icon className="w-5 h-5" />
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{service.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Стоимость:</span>
                  <span className="font-bold text-gray-900 flex items-center gap-1">
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

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Важно:</strong> После создания заказа с вами свяжется персональный менеджер для уточнения
                  деталей и согласования стоимости.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
