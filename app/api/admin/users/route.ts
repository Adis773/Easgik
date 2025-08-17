import { NextResponse } from "next/server"

// Mock users database
const users = [
  {
    id: 1,
    phone: "+79991234567",
    name: "Иван Петров",
    email: "ivan@example.com",
    role: "user",
    registeredAt: "2024-01-15",
  },
  {
    id: 2,
    phone: "+79991234568",
    name: "Администратор",
    email: "admin@geoservice.ru",
    role: "admin",
    registeredAt: "2024-01-01",
  },
  {
    id: 3,
    phone: "+79991234569",
    name: "Мария Сидорова",
    email: "maria@example.com",
    role: "partner",
    registeredAt: "2024-02-10",
  },
]

export async function GET() {
  return NextResponse.json({ users })
}
