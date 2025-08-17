"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DocumentPreview } from "./document-preview"
import { FileText, Download, Eye, Calendar, Building2 } from "lucide-react"

// Mock documents data - replace with actual CRM data
const mockDocuments = [
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
  },
  {
    id: "DOC-002",
    name: "Договор на выполнение работ",
    type: "Договор",
    objectId: "OBJ-002",
    objectAddress: "г. Москва, пр. Мира, д. 45, кв. 12",
    uploadDate: "2024-01-17T14:30:00Z",
    status: "pending_signature",
    fileUrl: "/placeholder.pdf",
    fileSize: "1.8 MB",
    description: "Договор на выполнение кадастровых работ",
  },
  {
    id: "DOC-003",
    name: "Межевой план участка",
    type: "Межевой план",
    objectId: "OBJ-003",
    objectAddress: "г. Москва, ул. Садовая, д. 78",
    uploadDate: "2024-01-15T09:15:00Z",
    status: "signed",
    fileUrl: "/placeholder.pdf",
    fileSize: "3.1 MB",
    description: "Межевой план земельного участка",
  },
]

export function DocumentsForSigning() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_signature":
        return <Badge variant="secondary">Требует подписи</Badge>
      case "signed":
        return <Badge variant="outline">Подписано</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  const handlePreview = (documentId: string) => {
    setSelectedDocument(documentId)
  }

  const handleDownload = (document: any) => {
    // TODO: Implement actual file download
    console.log("Downloading document:", document.name)
    // Create a temporary download link
    const link = document.createElement("a")
    link.href = document.fileUrl
    link.download = document.name
    link.click()
  }

  if (selectedDocument) {
    const document = mockDocuments.find((doc) => doc.id === selectedDocument)
    if (document) {
      return <DocumentPreview document={document} onBack={() => setSelectedDocument(null)} />
    }
  }

  const pendingDocuments = mockDocuments.filter((doc) => doc.status === "pending_signature")
  const signedDocuments = mockDocuments.filter((doc) => doc.status === "signed")

  return (
    <div className="space-y-6">
      {pendingDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Требуют подписи</h3>
          <div className="space-y-4">
            {pendingDocuments.map((document) => (
              <Card key={document.id} className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {document.name}
                      </CardTitle>
                      <CardDescription>{document.description}</CardDescription>
                    </div>
                    {getStatusBadge(document.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Объект</p>
                      <p className="text-sm text-gray-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {document.objectAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Дата загрузки</p>
                      <p className="text-sm text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(document.uploadDate).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Тип документа</p>
                      <p className="text-sm text-gray-900">{document.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Размер файла</p>
                      <p className="text-sm text-gray-900">{document.fileSize}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handlePreview(document.id)} variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Просмотр
                    </Button>
                    <Button onClick={() => handleDownload(document)}>
                      <Download className="w-4 h-4 mr-2" />
                      Скачать для подписи
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {signedDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Подписанные документы</h3>
          <div className="space-y-4">
            {signedDocuments.map((document) => (
              <Card key={document.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {document.name}
                      </CardTitle>
                      <CardDescription>{document.description}</CardDescription>
                    </div>
                    {getStatusBadge(document.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Объект</p>
                      <p className="text-sm text-gray-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {document.objectAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Дата загрузки</p>
                      <p className="text-sm text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(document.uploadDate).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handlePreview(document.id)} variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Просмотр
                    </Button>
                    <Button onClick={() => handleDownload(document)} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {mockDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет документов для подписи</h3>
            <p className="text-gray-600">Документы появятся здесь после их подготовки нашими специалистами</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
