import { type NextRequest, NextResponse } from "next/server"

// Mock promocodes storage
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

export async function GET() {
  return NextResponse.json({ promocodes })
}

export async function POST(request: NextRequest) {
  try {
    const { code, discount, type, usageLimit } = await request.json()

    // Check if code already exists
    if (promocodes.find((p) => p.code === code)) {
      return NextResponse.json({
        success: false,
        message: "Промокод с таким кодом уже существует",
      })
    }

    const newPromocode = {
      id: Math.max(...promocodes.map((p) => p.id), 0) + 1,
      code,
      discount,
      type,
      active: true,
      usageLimit,
      usageCount: 0,
    }

    promocodes.push(newPromocode)

    return NextResponse.json({
      success: true,
      promocode: newPromocode,
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
