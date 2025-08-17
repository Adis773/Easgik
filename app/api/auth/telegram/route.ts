import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for demo purposes
const users = new Map<string, { phone: string; password: string; id: string }>()
const codes = new Map<string, { code: string; phone: string; expires: number }>()

// Mock Telegram bot integration - replace with actual bot
async function sendTelegramMessage(phone: string, message: string): Promise<boolean> {
  console.log(`Sending Telegram message to ${phone}: ${message}`)
  await new Promise((resolve) => setTimeout(resolve, 500))
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { phone, password, action, code, mode } = await request.json()

    if (!phone) {
      return NextResponse.json({ success: false, message: "Номер телефона обязателен" }, { status: 400 })
    }

    if (action === "send") {
      if (!password || !mode) {
        return NextResponse.json({ success: false, message: "Пароль и режим обязательны" }, { status: 400 })
      }

      const existingUser = users.get(phone)

      if (mode === "login" && !existingUser) {
        return NextResponse.json({ success: false, message: "Пользователь с таким номером не найден" }, { status: 400 })
      }

      if (mode === "login" && existingUser && existingUser.password !== password) {
        return NextResponse.json({ success: false, message: "Неверный пароль" }, { status: 400 })
      }

      if (mode === "register" && existingUser) {
        return NextResponse.json(
          { success: false, message: "Пользователь с таким номером уже существует" },
          { status: 400 },
        )
      }

      const telegramCode = "1234"
      codes.set(phone, {
        code: telegramCode,
        phone,
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      })

      const message = `Ваш код для входа: ${telegramCode}`
      const sent = await sendTelegramMessage(phone, message)

      if (!sent) {
        return NextResponse.json({ success: false, message: "Ошибка отправки сообщения в Telegram" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Код отправлен в Telegram",
      })
    } else if (action === "verify") {
      if (!code) {
        return NextResponse.json({ success: false, message: "Код обязателен" }, { status: 400 })
      }

      const storedCode = codes.get(phone)

      if (!storedCode || storedCode.code !== code || storedCode.expires < Date.now()) {
        return NextResponse.json({ success: false, message: "Неверный или истекший код" }, { status: 400 })
      }

      // Remove used code
      codes.delete(phone)

      let user

      if (mode === "register") {
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        user = {
          id: userId,
          phone,
          password,
        }
        users.set(phone, user)
      } else {
        user = users.get(phone)
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user?.id,
          phone: user?.phone,
        },
        message:
          mode === "register" ? "Регистрация через Telegram выполнена успешно" : "Вход через Telegram выполнен успешно",
      })
    }

    return NextResponse.json({ success: false, message: "Неверное действие" }, { status: 400 })
  } catch (error) {
    console.error("Telegram error:", error)
    return NextResponse.json({ success: false, message: "Ошибка сервера" }, { status: 500 })
  }
}
