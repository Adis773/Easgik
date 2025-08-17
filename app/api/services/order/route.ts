import { type NextRequest, NextResponse } from "next/server"

// Mock CRM integration for service orders
interface ServiceOrder {
  id: string
  serviceId: string
  serviceName: string
  cadastralNumber?: string
  address: string
  comments?: string
  customService?: string
  estimatedPrice: { from: number; to: number }
  duration: string
  status: "pending" | "confirmed" | "in_progress" | "completed"
  userId: string
  createdAt: string
}

async function createOrderInCRM(orderData: Omit<ServiceOrder, "id" | "status" | "createdAt">): Promise<ServiceOrder> {
  // TODO: Replace with actual CRM API call
  console.log("Creating order in CRM:", orderData)

  // Simulate CRM API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const order: ServiceOrder = {
    ...orderData,
    id: `ORD-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  return order
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const { serviceId, serviceName, cadastralNumber, address, comments, customService, estimatedPrice, duration } =
      orderData

    if (!serviceId || !serviceName || !address) {
      return NextResponse.json({ error: "Обязательные поля: serviceId, serviceName, address" }, { status: 400 })
    }

    // TODO: Get actual user ID from authentication
    const userId = "user-123"

    const order = await createOrderInCRM({
      serviceId,
      serviceName,
      cadastralNumber,
      address,
      comments,
      customService,
      estimatedPrice,
      duration,
      userId,
    })

    return NextResponse.json({
      success: true,
      order,
      message: "Заказ успешно создан",
    })
  } catch (error) {
    console.error("Service order error:", error)
    return NextResponse.json({ error: "Ошибка создания заказа" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Get actual user ID from authentication
    const userId = "user-123"

    // TODO: Replace with actual CRM API call to get user's orders
    const mockOrders: ServiceOrder[] = [
      {
        id: "ORD-001",
        serviceId: "tech-plan",
        serviceName: "Технический план",
        address: "г. Москва, ул. Ленина, д. 10, кв. 25",
        cadastralNumber: "77:01:0001001:1234",
        estimatedPrice: { from: 15000, to: 15000 },
        duration: "5-7 рабочих дней",
        status: "in_progress",
        userId,
        createdAt: "2024-01-15T10:00:00Z",
      },
    ]

    return NextResponse.json({
      success: true,
      orders: mockOrders,
    })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Ошибка получения заказов" }, { status: 500 })
  }
}
