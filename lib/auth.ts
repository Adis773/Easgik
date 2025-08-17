// Authentication utilities and types

export interface User {
  id: string
  phone: string
  firstName?: string
  lastName?: string
  middleName?: string
  email?: string
  isRegistered: boolean
  paymentMethod?: "cash" | "bank_transfer" | "qr_code" | "requisites"
  documentDelivery?: "office" | "courier" | "yandex" | "cdek"
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication functions - replace with actual implementation
export async function loginWithPassword(phone: string, password: string): Promise<{ user: User; token: string }> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, password, method: "password" }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Ошибка входа")
  }

  return response.json()
}

export async function sendSMSCode(phone: string): Promise<void> {
  const response = await fetch("/api/auth/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, action: "send" }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Ошибка отправки SMS")
  }
}

export async function verifySMSCode(phone: string, code: string): Promise<{ token: string }> {
  const response = await fetch("/api/auth/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, code, action: "verify" }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Неверный код")
  }

  return response.json()
}

export async function initiateTelegramAuth(phone: string): Promise<{ loginCode: string; botUrl: string }> {
  const response = await fetch("/api/auth/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, action: "initiate" }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Ошибка Telegram авторизации")
  }

  return response.json()
}
