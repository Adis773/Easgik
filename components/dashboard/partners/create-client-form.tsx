"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

interface CreateClientFormProps {
  onBack: () => void
}

export function CreateClientForm({ onBack }: CreateClientFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    passportSeries: "",
    passportNumber: "",
    passportIssuedBy: "",
    passportIssuedDate: "",
    address: "",
    snils: "",
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
      const clientData = {
        ...formData,
        timestamp: new Date().toISOString(),
      }

      console.log("Creating client:", clientData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Контрагент добавлен успешно",
        description: "Новый контрагент добавлен в вашу базу. Теперь вы можете создавать для него заказы.",
      })

      onBack()
    } catch (error) {
      console.error("Client creation error:", error)
      toast({
        title: "Ошибка добавления контрагента",
        description: "Произошла ошибка при добавлении контрагента. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phone.trim() &&
      formData.passportSeries.trim() &&
      formData.passportNumber.trim()
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к контрагентам
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Добавление контрагента</h1>
          <p className="text-gray-600">Заполните персональные данные нового контрагента</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Персональные данные</CardTitle>
          <CardDescription>Укажите полную информацию о контрагенте</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  placeholder="Иванов"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  placeholder="Иван"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  placeholder="Иванович"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Паспортные данные</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passportSeries">Серия паспорта *</Label>
                  <Input
                    id="passportSeries"
                    placeholder="1234"
                    maxLength={4}
                    value={formData.passportSeries}
                    onChange={(e) => handleInputChange("passportSeries", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Номер паспорта *</Label>
                  <Input
                    id="passportNumber"
                    placeholder="567890"
                    maxLength={6}
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportIssuedBy">Кем выдан</Label>
                <Input
                  id="passportIssuedBy"
                  placeholder="ОУФМС России по г. Москве"
                  value={formData.passportIssuedBy}
                  onChange={(e) => handleInputChange("passportIssuedBy", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportIssuedDate">Дата выдачи</Label>
                <Input
                  id="passportIssuedDate"
                  type="date"
                  value={formData.passportIssuedDate}
                  onChange={(e) => handleInputChange("passportIssuedDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес прописки</Label>
              <Textarea
                id="address"
                placeholder="г. Москва, ул. Ленина, д. 10, кв. 25"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snils">СНИЛС</Label>
              <Input
                id="snils"
                placeholder="123-456-789 00"
                value={formData.snils}
                onChange={(e) => handleInputChange("snils", e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={!isFormValid() || isSubmitting} className="flex-1">
                {isSubmitting ? "Добавление..." : "Добавить контрагента"}
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
