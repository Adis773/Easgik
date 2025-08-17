import { type NextRequest, NextResponse } from "next/server"

// Mock document management API
interface Document {
  id: string
  name: string
  type: string
  objectId: string
  objectAddress: string
  uploadDate: string
  status: "pending_signature" | "signed" | "uploaded"
  fileUrl: string
  fileSize: string
  description: string
  userId: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // 'for-signing' or 'signed'

    // TODO: Get actual user ID from authentication
    const userId = "user-123"

    // TODO: Replace with actual CRM API call
    const mockDocuments: Document[] = [
      {
        id: "DOC-001",
        name: "Технический план квартиры",
        type: "Технический план",
        objectId: "OBJ-001",
        objectAddress: "г. Москва, ул. Ленина, д. 10, кв. 25",
        uploadDate: "2024-01-18T10:00:00Z",
        status: "pending_signature",
        fileUrl: "/placeholder.pdf",
        fileSize: "2.4 MB",
        description: "Технический план на квартиру для регистрации права собственности",
        userId,
      },
    ]

    const filteredDocuments = type
      ? mockDocuments.filter((doc) => {
          if (type === "for-signing") return doc.status === "pending_signature"
          if (type === "signed") return doc.status === "signed" || doc.status === "uploaded"
          return true
        })
      : mockDocuments

    return NextResponse.json({
      success: true,
      documents: filteredDocuments,
    })
  } catch (error) {
    console.error("Get documents error:", error)
    return NextResponse.json({ error: "Ошибка получения документов" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Handle file upload for signed documents
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: "Файлы не найдены" }, { status: 400 })
    }

    // TODO: Process and store files
    const uploadedDocuments = []

    for (const file of files) {
      // TODO: Save file to storage and create document record in CRM
      const document = {
        id: `SIGNED-${Date.now()}`,
        name: file.name,
        type: "Подписанный документ",
        objectId: "OBJ-001", // This should be determined from the file or form data
        objectAddress: "г. Москва, ул. Ленина, д. 10, кв. 25",
        uploadDate: new Date().toISOString(),
        status: "uploaded",
        fileUrl: `/uploads/${file.name}`, // This should be the actual stored file URL
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        description: "Подписанный документ от клиента",
        userId: "user-123",
      }

      uploadedDocuments.push(document)
    }

    return NextResponse.json({
      success: true,
      documents: uploadedDocuments,
      message: `Загружено ${files.length} файл(ов)`,
    })
  } catch (error) {
    console.error("Upload documents error:", error)
    return NextResponse.json({ error: "Ошибка загрузки документов" }, { status: 500 })
  }
}
