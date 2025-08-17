"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Promocode {
  id: number
  code: string
  discount: number
  type: "percentage" | "fixed"
  active: boolean
  usageLimit?: number
  usageCount: number
}

interface User {
  id: number
  phone: string
  name: string
  email: string
  role: string
  registeredAt: string
}

export default function AdminPage() {
  const [promocodes, setPromocodes] = useState<Promocode[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [newPromocode, setNewPromocode] = useState({
    code: "",
    discount: 0,
    type: "percentage" as "percentage" | "fixed",
    usageLimit: undefined as number | undefined,
  })
  const { toast } = useToast()

  useEffect(() => {
    loadPromocodes()
    loadUsers()
  }, [])

  const loadPromocodes = async () => {
    try {
      const response = await fetch("/api/admin/promocodes")
      const data = await response.json()
      setPromocodes(data.promocodes || [])
    } catch (error) {
      console.error("Error loading promocodes:", error)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Error loading users:", error)
    }
  }

  const createPromocode = async () => {
    try {
      const response = await fetch("/api/admin/promocodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPromocode),
      })

      const data = await response.json()
      if (data.success) {
        toast({ title: "Промокод создан", description: "Новый промокод успешно добавлен" })
        setNewPromocode({ code: "", discount: 0, type: "percentage", usageLimit: undefined })
        loadPromocodes()
      } else {
        toast({ title: "Ошибка", description: data.message, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось создать промокод", variant: "destructive" })
    }
  }

  const togglePromocode = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/promocodes/${id}/toggle`, {
        method: "POST",
      })

      const data = await response.json()
      if (data.success) {
        toast({ title: "Промокод обновлен", description: "Статус промокода изменен" })
        loadPromocodes()
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось обновить промокод", variant: "destructive" })
    }
  }

  const deletePromocode = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/promocodes/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()
      if (data.success) {
        toast({ title: "Промокод удален", description: "Промокод успешно удален" })
        loadPromocodes()
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось удалить промокод", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Панель администратора</h1>

        <Tabs defaultValue="promocodes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="promocodes">Промокоды</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
          </TabsList>

          <TabsContent value="promocodes" className="space-y-6">
            {/* Create Promocode */}
            <Card>
              <CardHeader>
                <CardTitle>Создать промокод</CardTitle>
                <CardDescription>Добавьте новый промокод для скидок</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Код промокода</Label>
                    <Input
                      id="code"
                      value={newPromocode.code}
                      onChange={(e) => setNewPromocode({ ...newPromocode, code: e.target.value })}
                      placeholder="СКИДКА10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Размер скидки</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={newPromocode.discount}
                      onChange={(e) => setNewPromocode({ ...newPromocode, discount: Number(e.target.value) })}
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Тип скидки</Label>
                    <select
                      id="type"
                      className="w-full p-2 border rounded-md"
                      value={newPromocode.type}
                      onChange={(e) =>
                        setNewPromocode({ ...newPromocode, type: e.target.value as "percentage" | "fixed" })
                      }
                    >
                      <option value="percentage">Процент (%)</option>
                      <option value="fixed">Фиксированная сумма (₽)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="usageLimit">Лимит использований</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      value={newPromocode.usageLimit || ""}
                      onChange={(e) =>
                        setNewPromocode({
                          ...newPromocode,
                          usageLimit: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      placeholder="Без ограничений"
                    />
                  </div>
                </div>
                <Button onClick={createPromocode} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать промокод
                </Button>
              </CardContent>
            </Card>

            {/* Promocodes List */}
            <Card>
              <CardHeader>
                <CardTitle>Активные промокоды</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promocodes.map((promo) => (
                    <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-semibold">{promo.code}</div>
                          <div className="text-sm text-gray-600">
                            {promo.type === "percentage" ? `${promo.discount}%` : `${promo.discount}₽`} скидка
                          </div>
                          <div className="text-xs text-gray-500">
                            Использований: {promo.usageCount}
                            {promo.usageLimit && ` / ${promo.usageLimit}`}
                          </div>
                        </div>
                        <Badge variant={promo.active ? "default" : "secondary"}>
                          {promo.active ? "Активен" : "Неактивен"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => togglePromocode(promo.id)}>
                          {promo.active ? "Деактивировать" : "Активировать"}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deletePromocode(promo.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Пользователи системы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.phone}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-xs text-gray-500">
                          Роль: {user.role} | Регистрация: {user.registeredAt}
                        </div>
                      </div>
                      <Badge variant={user.role === "admin" ? "destructive" : "default"}>{user.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
