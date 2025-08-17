"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Copy, Link, TrendingUp, Users, RussianRubleIcon as Ruble, Building2, Check } from "lucide-react"

// Mock partner program data
const partnerData = {
  referralLink: "https://crm-cabinet.com/ref/PARTNER123",
  registeredUsers: 12,
  currentBalance: 85000,
  totalEarnings: 245000,
  pendingWithdrawal: 0,
}

const partnerClients = [
  {
    id: "REF-001",
    name: "Иванов И.И.",
    registrationDate: "2024-01-15T10:00:00Z",
    status: "completed",
    workType: "Технический план",
    workAmount: 15000,
    commission: 2250, // 15%
    commissionRate: 15,
  },
  {
    id: "REF-002",
    name: "Петрова М.С.",
    registrationDate: "2024-01-10T14:30:00Z",
    status: "in_progress",
    workType: "Межевой план",
    workAmount: 25000,
    commission: 3750,
    commissionRate: 15,
  },
  {
    id: "REF-003",
    name: "Сидоров А.В.",
    registrationDate: "2024-01-08T09:15:00Z",
    status: "completed",
    workType: "Топографическая съемка",
    workAmount: 35000,
    commission: 5250,
    commissionRate: 15,
  },
]

export function PartnerProgram() {
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const { toast } = useToast()

  const copyReferralLink = () => {
    navigator.clipboard.writeText(partnerData.referralLink)
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена",
    })
  }

  const requestWithdrawal = () => {
    const amount = Number.parseFloat(withdrawalAmount)
    if (amount <= 0 || amount > partnerData.currentBalance) {
      toast({
        title: "Некорректная сумма",
        description: "Укажите корректную сумму для вывода",
        variant: "destructive",
      })
      return
    }

    // TODO: Implement withdrawal request
    toast({
      title: "Запрос на вывод отправлен",
      description: `Запрос на вывод ${amount.toLocaleString()} ₽ отправлен на обработку`,
    })
    setWithdrawalAmount("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Завершено
          </Badge>
        )
      case "in_progress":
        return <Badge variant="default">В работе</Badge>
      case "pending":
        return <Badge variant="secondary">Ожидает</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Привлечено клиентов</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{partnerData.registeredUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Ruble className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Текущий баланс</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{partnerData.currentBalance.toLocaleString()} ₽</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Общий заработок</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{partnerData.totalEarnings.toLocaleString()} ₽</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">К выводу</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{partnerData.pendingWithdrawal.toLocaleString()} ₽</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="w-5 h-5" />
              Реферальная ссылка
            </CardTitle>
            <CardDescription>Поделитесь ссылкой для привлечения новых клиентов</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={partnerData.referralLink} readOnly className="font-mono text-sm" />
              <Button onClick={copyReferralLink} variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Зарегистрировались по вашей ссылке: <strong>{partnerData.registeredUsers} человек</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruble className="w-5 h-5" />
              Вывод средств
            </CardTitle>
            <CardDescription>Запросите вывод заработанных средств</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Доступно к выводу</p>
              <p className="text-xl font-bold text-gray-900">{partnerData.currentBalance.toLocaleString()} ₽</p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Сумма к выводу"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                type="number"
                max={partnerData.currentBalance}
              />
              <Button onClick={requestWithdrawal} disabled={!withdrawalAmount}>
                Запросить
              </Button>
            </div>
            <p className="text-xs text-gray-500">Минимальная сумма для вывода: 5,000 ₽</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Контрагенты и заработок</CardTitle>
          <CardDescription>Список привлеченных контрагентов и ваш доход с каждого</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {partnerClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-600">
                      Регистрация: {new Date(client.registrationDate).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{client.workType}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(client.status)}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Сумма работы: {client.workAmount.toLocaleString()} ₽</p>
                    <p className="font-medium text-gray-900">
                      Ваш доход: {client.commission.toLocaleString()} ₽ ({client.commissionRate}%)
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {partnerClients.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет привлеченных контрагентов</h3>
                <p className="text-gray-600">Поделитесь реферальной ссылкой для привлечения первых клиентов</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
