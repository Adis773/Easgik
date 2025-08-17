"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

interface CreateOrderFormProps {
  onBack: () => void
}

const services = [
  { id: "tech-plan", name: "Технический план" },
  { id: "boundary-plan", name: "Межевой план" },
  { id: "land-scheme", name: "Схема ЗУ на КПТ" },
  { id: "boundary-marking", name: "Вынос границ" },
  { id: "topographic-survey", name: "Топографическая съемка" },
  { id: "other", name: "Другое" },
]

export function CreateOrderForm({ onBack }: CreateOrderFormProps) {
  const [formData, setFormData] = useState({
    service: "",
    customService: "",
    cadastralNumber: "",
    address: "",
    client: "",
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
      // TODO: Replace with actual API call
      const orderData = {
        service:
          formData.service === "other" ? formData.customService : services.find((s) => s.id === formData.service)?.name,
        cadastralNumber: formData.cadastralNumber,
        address: formData.address,
        client: formData.client,
        comments: formData.comments,
        timestamp: new Date().toISOString(),
      }

      console.log("Creating partner order:", orderData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Заявка создана успешно",
        description: "Заявка отправлена на расчет коммерческого предложения. Ожидайте уведомления о готовности.",
      })

      onBack()
    } catch (error) {
      console.error("Order creation error:", error)
      toast({
        title: "Ошибка создания заявки",
        description: "Произошла ошибка при создании заявки. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    const hasService = formData.service && (formData.service !== "other" || formData.customService.trim())
    return hasService && formData.address.trim() && formData.client.trim()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к заявкам
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Создание заявки</h1>
          <p className="text-gray-600">Заполните форму для создания новой заявки</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о заказе</CardTitle>
          <CardDescription>Укажите детали для расчета коммерческого предложения</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="service">Услуга *</Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Контрагент *</Label>
                <Input
                  id="client"
                  placeholder="ФИО контрагента"
                  value={formData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  required
                />
              </div>
            </div>

            {formData.service === "other" && (
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
                {isSubmitting ? "Отправка заявки..." : "Отправить запрос на расчет"}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
