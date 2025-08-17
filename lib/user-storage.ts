// Shared user storage for both SMS and Telegram authentication
// In production, replace with actual database

export interface User {
  id: string
  phone: string
  name: string
  email: string
  password: string
  createdAt: number
}

export interface CodeData {
  code: string
  expires: number
  password: string
  mode: "login" | "register"
}

// In-memory storage (use Redis or database in production)
export const usersStorage = new Map<string, User>()
export const smsCodeStorage = new Map<string, CodeData>()
export const telegramCodeStorage = new Map<string, CodeData>()

// Helper functions
export function createUser(phone: string, password: string): User {
  const user: User = {
    id: Date.now().toString(),
    phone: phone,
    name: "Новый пользователь",
    email: "",
    password: password,
    createdAt: Date.now(),
  }
  usersStorage.set(phone, user)
  return user
}

export function getUser(phone: string): User | undefined {
  return usersStorage.get(phone)
}

export function userExists(phone: string): boolean {
  return usersStorage.has(phone)
}

// Add some demo users for testing
usersStorage.set("+79991234567", {
  id: "demo1",
  phone: "+79991234567",
  name: "Демо Пользователь",
  email: "demo@example.com",
  password: "123456",
  createdAt: Date.now(),
})
