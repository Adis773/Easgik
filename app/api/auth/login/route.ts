import { type NextRequest, NextResponse } from "next/server"

// Mock CRM integration - replace with actual CRM API
interface CRMUser {
  id: string
  phone: string
  firstName?: string
  lastName?: string
  middleName?: string
  email?: string
  isRegistered: boolean
}

async function checkUserInCRM(phone: string): Promise<CRMUser | null> {
  // TODO: Replace with actual CRM API call
  // This is a mock implementation
  console.log("Checking user in CRM:", phone)

  // Simulate CRM API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock response - replace with actual CRM integration
  if (phone === "+79991234567") {
    return {
      id: "1",
      phone,
      firstName: "Иван",
      lastName: "Иванов",
      middleName: "Иванович",
      email: "ivan@example.com",
      isRegistered: true,
    }
  }

  return null
}

async function createUserInCRM(phone: string): Promise<CRMUser> {
  // TODO: Replace with actual CRM API call
  console.log("Creating user in CRM:", phone)

  // Simulate CRM API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock response - replace with actual CRM integration
  return {
    id: Date.now().toString(),
    phone,
    isRegistered: false,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { phone, password, method } = await request.json()

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Номер телефона обязателен",
        },
        { status: 400 },
      )
    }

    // Check if user exists in CRM
    let user = await checkUserInCRM(phone)

    if (!user) {
      // Create new user in CRM
      user = await createUserInCRM(phone)
    }

    if (method === "password") {
      if (!password) {
        return NextResponse.json(
          {
            success: false,
            message: "Пароль обязателен",
          },
          { status: 400 },
        )
      }

      if (password !== "123456") {
        return NextResponse.json(
          {
            success: false,
            message: "Неверный пароль",
          },
          { status: 401 },
        )
      }
    }

    const token = "mock-jwt-token-" + Date.now()

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.firstName ? `${user.firstName} ${user.lastName}` : "Пользователь",
        email: user.email || "",
      },
      token,
      message: "Успешный вход в систему",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка сервера",
      },
      { status: 500 },
    )
  }
}
