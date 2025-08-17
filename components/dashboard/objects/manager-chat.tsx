"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, User, Bot } from "lucide-react"

interface ManagerChatProps {
  object: {
    id: string
    workType: string
    manager: {
      name: string
      phone: string
      email: string
    }
  }
  onBack: () => void
}

interface Message {
  id: string
  text: string
  sender: "user" | "manager"
  timestamp: Date
  senderName: string
}

export function ManagerChat({ object, onBack }: ManagerChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Добро пожаловать в чат! Я ваш персональный менеджер по объекту. Готов ответить на любые вопросы.",
      sender: "manager",
      timestamp: new Date(Date.now() - 3600000),
      senderName: object.manager.name,
    },
    {
      id: "2",
      text: "Работы по техническому плану идут по графику. Выезд на объект запланирован на завтра.",
      sender: "manager",
      timestamp: new Date(Date.now() - 1800000),
      senderName: object.manager.name,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      senderName: "Вы",
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate manager response
    setTimeout(() => {
      const managerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Спасибо за ваш вопрос! Я обработаю его и отвечу в ближайшее время.",
        sender: "manager",
        timestamp: new Date(),
        senderName: object.manager.name,
      }
      setMessages((prev) => [...prev, managerResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к объекту
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Чат с менеджером</h1>
          <p className="text-gray-600">
            {object.workType} - Объект #{object.id}
          </p>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {object.manager.name}
          </CardTitle>
          <CardDescription>Персональный менеджер проекта</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
