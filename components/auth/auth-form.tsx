"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Phone, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type AuthStep = "credentials" | "verification"
type AuthMode = "login" | "register"
type CodeMethod = "sms" | "telegram"

export function AuthForm() {
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [step, setStep] = useState<AuthStep>("credentials")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [codeMethod, setCodeMethod] = useState<CodeMethod>("sms")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (authMode === "register" && password !== confirmPassword) {
      toast({
        title: "Пароли не совпадают",
        description: "Проверьте правильность ввода паролей",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const endpoint = codeMethod === "sms" ? "/api/auth/sms" : "/api/auth/telegram"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          password,
          action: "send",
          mode: authMode,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStep("verification")
        toast({
          title: `Код отправлен`,
          description: `Введите код 1234 для ${authMode === "login" ? "входа" : "регистрации"}`,
        })
      } else {
        if (data.message.includes("не найден")) {
          toast({ title: "Нет такого аккаунта", description: "Нужно зарегистрироваться", variant: "destructive" })
        } else if (data.message.includes("Неверный пароль")) {
          toast({ title: "Неправильный пароль", description: "Проверьте правильность пароля", variant: "destructive" })
        } else {
          toast({ title: "Ошибка", description: data.message, variant: "destructive" })
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
      toast({ title: "Ошибка", description: "Не удалось отправить код", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = codeMethod === "sms" ? "/api/auth/sms" : "/api/auth/telegram"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          password,
          code: verificationCode,
          action: "verify",
          mode: authMode,
        }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user))
        toast({
          title: "Успешно!",
          description: authMode === "login" ? "Добро пожаловать в личный кабинет" : "Аккаунт успешно создан",
        })

        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        toast({ title: "Неправильный код", description: "Попробуйте еще раз", variant: "destructive" })
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast({ title: "Ошибка", description: "Не удалось подтвердить код", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{authMode === "login" ? "Вход в систему" : "Регистрация"}</CardTitle>
        <CardDescription>
          {step === "credentials"
            ? authMode === "login"
              ? "Введите данные для входа"
              : "Создайте новый аккаунт"
            : "Введите код подтверждения"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "credentials" ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {authMode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-3">
              <Label>Способ получения кода подтверждения</Label>
              <RadioGroup value={codeMethod} onValueChange={(value) => setCodeMethod(value as CodeMethod)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer">
                    <Phone className="w-4 h-4" />
                    SMS сообщение
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="telegram" id="telegram" />
                  <Label htmlFor="telegram" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    Telegram
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Отправка кода..." : "Получить код подтверждения"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код подтверждения</Label>
              <Input
                id="code"
                type="text"
                placeholder="1234"
                maxLength={4}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">Введите код 1234 для подтверждения</p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("credentials")}
                className="flex-1 bg-transparent"
              >
                Назад
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Проверка..." : authMode === "login" ? "Войти" : "Зарегистрироваться"}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setAuthMode(authMode === "login" ? "register" : "login")
              setStep("credentials")
              setVerificationCode("")
            }}
            className="text-sm text-primary hover:underline"
          >
            {authMode === "login" ? "Нет аккаунта? Регистрация" : "Уже есть аккаунт? Войти"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
