import { type NextRequest, NextResponse } from "next/server"

// Mock promocodes storage (shared with main route)
const promocodes = [
  {
    id: 1,
    code: "СКИДКА10",
    discount: 10,
    type: "percentage" as "percentage" | "fixed",
    active: true,
    usageLimit: 100,
    usageCount: 5,
  },
  {
    id: 2,
    code: "НОВЫЙ500",
    discount: 500,
    type: "fixed" as "percentage" | "fixed",
    active: true,
    usageLimit: undefined,
    usageCount: 12,
  },
]

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const index = promocodes.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({
        success: false,
        message: "Промокод не найден",
      })
    }

    promocodes.splice(index, 1)

    return NextResponse.json({
      success: true,
      message: "Промокод удален",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка сервера",
      },
      { status: 500 },
    )
  }
}
