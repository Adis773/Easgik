"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, Mail, CreditCard, Truck, Edit, Save, X } from "lucide-react"

export function ProfileOverview() {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPersonalData, setIsEditingPersonalData] = useState(false)

  const [user, setUser] = useState({
    firstName: "Иван",
    lastName: "Иванов",
    middleName: "Иванович",
    phone: "+7 (999) 123-45-67",
    email: "ivan@example.com",
    paymentMethod: "bank_transfer",
    documentDelivery: "courier",
  })

  const [personalData, setPersonalData] = useState({
    passportSeries: "",
    passportNumber: "",
    passportIssuer: "",
    passportDate: "",
    address: "",
    snils: "",
  })

  const paymentMethods = {
    cash: "Наличные",
    bank_transfer: "Банковский перевод",
    qr_code: "QR-код",
    requisites: "Оплата по реквизитам",
  }

  const deliveryMethods = {
    office: "В офисе",
    courier: "Курьер на объект",
    yandex: "Яндекс доставка",
    cdek: "CDEK",
  }

  const handleSaveProfile = () => {
    console.log("[v0] Saving profile:", user)
    setIsEditing(false)
    alert("Профиль успешно сохранен!")
  }

  const handleSavePersonalData = () => {
    console.log("[v0] Saving personal data:", personalData)
    setIsEditingPersonalData(false)
    alert("Персональные данные успешно сохранены!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Профиль пользователя
          </CardTitle>
          <CardDescription>Основная информация о вашем аккаунте</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input
                    id="middleName"
                    value={user.middleName}
                    onChange={(e) => setUser({ ...user, middleName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Способ оплаты</Label>
                  <Select
                    value={user.paymentMethod}
                    onValueChange={(value) => setUser({ ...user, paymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(paymentMethods).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Способ получения документов</Label>
                  <Select
                    value={user.documentDelivery}
                    onValueChange={(value) => setUser({ ...user, documentDelivery: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(deliveryMethods).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">ФИО</label>
                  <p className="text-sm text-gray-900">
                    {user.lastName} {user.firstName} {user.middleName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Телефон</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Способ оплаты</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {paymentMethods[user.paymentMethod as keyof typeof paymentMethods]}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Способ получения документов</label>
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    {deliveryMethods[user.documentDelivery as keyof typeof deliveryMethods]}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Редактировать профиль
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Персональные данные</CardTitle>
          <CardDescription>Паспортные данные и документы</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditingPersonalData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passportSeries">Серия паспорта</Label>
                  <Input
                    id="passportSeries"
                    placeholder="1234"
                    value={personalData.passportSeries}
                    onChange={(e) => setPersonalData({ ...personalData, passportSeries: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="passportNumber">Номер паспорта</Label>
                  <Input
                    id="passportNumber"
                    placeholder="567890"
                    value={personalData.passportNumber}
                    onChange={(e) => setPersonalData({ ...personalData, passportNumber: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="passportIssuer">Кем выдан</Label>
                <Input
                  id="passportIssuer"
                  placeholder="ОУФМС России по..."
                  value={personalData.passportIssuer}
                  onChange={(e) => setPersonalData({ ...personalData, passportIssuer: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="passportDate">Дата выдачи</Label>
                <Input
                  id="passportDate"
                  type="date"
                  value={personalData.passportDate}
                  onChange={(e) => setPersonalData({ ...personalData, passportDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Адрес прописки</Label>
                <Input
                  id="address"
                  placeholder="г. Москва, ул. ..."
                  value={personalData.address}
                  onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="snils">СНИЛС</Label>
                <Input
                  id="snils"
                  placeholder="123-456-789 00"
                  value={personalData.snils}
                  onChange={(e) => setPersonalData({ ...personalData, snils: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSavePersonalData} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Сохранить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingPersonalData(false)}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Паспортные данные</p>
                <Badge variant="outline" className="mt-1">
                  {personalData.passportSeries || personalData.passportNumber ? "Заполнено" : "Не заполнено"}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditingPersonalData(true)}>
                {personalData.passportSeries || personalData.passportNumber ? "Редактировать" : "Заполнить"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
