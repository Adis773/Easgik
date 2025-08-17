"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Tag } from "lucide-react"

export function PaymentSummary() {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [originalAmount] = useState(15000)
  const [discountAmount, setDiscountAmount] = useState(0)

  // Mock active order - replace with actual data from CRM
  const activeOrder = {
    id: "ORD-001",
    serviceName: "Технический план на квартиру",
    amount: originalAmount,
    status: "В работе",
  }

  const applyPromoCode = () => {
    // Mock promo code validation - replace with actual API call
    const promoCodes = {
      СКИДКА10: 0.1,
      НОВЫЙ2024: 0.15,
      VIP20: 0.2,
    }

    const discount = promoCodes[promoCode as keyof typeof promoCodes]
    if (discount) {
      setAppliedPromo(promoCode)
      setDiscountAmount(originalAmount * discount)
    } else {
      // Show error - invalid promo code
      console.log("Неверный промокод")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
    setDiscountAmount(0)
    setPromoCode("")
  }

  const finalAmount = originalAmount - discountAmount

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />К оплате
          </CardTitle>
          <CardDescription>Текущий заказ и сумма к оплате</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeOrder ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{activeOrder.serviceName}</p>
                    <p className="text-sm text-gray-600">Заказ #{activeOrder.id}</p>
                  </div>
                  <Badge variant="outline">{activeOrder.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Стоимость услуги:</span>
                    <span>{originalAmount.toLocaleString()} ₽</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Скидка ({appliedPromo}):</span>
                      <span>-{discountAmount.toLocaleString()} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-lg border-t pt-2">
                    <span>Итого к оплате:</span>
                    <span>{finalAmount.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="promo-code" className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Промокод
                </Label>
                {appliedPromo ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex-1">
                      {appliedPromo} применен
                    </Badge>
                    <Button variant="outline" size="sm" onClick={removePromoCode}>
                      Удалить
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      id="promo-code"
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={applyPromoCode} disabled={!promoCode}>
                      Применить
                    </Button>
                  </div>
                )}
              </div>

              <Button className="w-full" size="lg">
                Оплатить {finalAmount.toLocaleString()} ₽
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Нет активных заказов</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Заказать услугу
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
