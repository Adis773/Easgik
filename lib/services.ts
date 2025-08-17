// Services utilities and types

export interface Service {
  id: string
  name: string
  description: string
  price: { from: number; to: number }
  duration: string
  features: string[]
  popular: boolean
}

export interface ServiceOrder {
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

export async function createServiceOrder(orderData: {
  serviceId: string
  serviceName: string
  cadastralNumber?: string
  address: string
  comments?: string
  customService?: string
  estimatedPrice: { from: number; to: number }
  duration: string
}): Promise<ServiceOrder> {
  const response = await fetch("/api/services/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Ошибка создания заказа")
  }

  const result = await response.json()
  return result.order
}

export async function getUserOrders(): Promise<ServiceOrder[]> {
  const response = await fetch("/api/services/order", {
    method: "GET",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Ошибка получения заказов")
  }

  const result = await response.json()
  return result.orders
}
