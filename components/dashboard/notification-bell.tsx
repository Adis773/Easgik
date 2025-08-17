"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, FileText, AlertCircle, CheckCircle } from "lucide-react"

export function NotificationBell() {
  const [notifications] = useState([
    {
      id: 1,
      type: "document",
      title: "Новые документы для подписи",
      message: "Технический план готов к подписанию",
      time: "2 часа назад",
      read: false,
      icon: FileText,
    },
    {
      id: 2,
      type: "info",
      title: "Заполните персональные данные",
      message: "Для продолжения работы необходимо заполнить паспортные данные",
      time: "1 день назад",
      read: false,
      icon: AlertCircle,
    },
    {
      id: 3,
      type: "success",
      title: "Оплата получена",
      message: "Платеж по заказу #ORD-001 успешно обработан",
      time: "2 дня назад",
      read: true,
      icon: CheckCircle,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-4">
              <div
                className={`p-1 rounded-full ${
                  notification.type === "document"
                    ? "bg-blue-100 text-blue-600"
                    : notification.type === "info"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                }`}
              >
                <notification.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                  {notification.title}
                </p>
                <p className="text-xs text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400">{notification.time}</p>
              </div>
              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>
            <p className="text-sm text-gray-500">Нет новых уведомлений</p>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center">
          <Button variant="ghost" size="sm" className="w-full">
            Показать все
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
