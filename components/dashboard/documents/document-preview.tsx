"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Building2, Calendar } from "lucide-react"

interface DocumentPreviewProps {
  document: {
    id: string
    name: string
    type: string
    objectId: string
    objectAddress: string
    uploadDate: string
    status: string
    fileUrl: string
    fileSize: string
    description: string
  }
  onBack: () => void
}

export function DocumentPreview({ document, onBack }: DocumentPreviewProps) {
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

  const handleDownload = () => {
    // TODO: Implement actual file download
    console.log("Downloading document:", document.name)
    const link = document.createElement("a")
    link.href = document.fileUrl
    link.download = document.name
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к документам
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Предварительный просмотр</h1>
          <p className="text-gray-600">Просмотр документа перед скачиванием</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Просмотр документа</CardTitle>
              <CardDescription>
                Предварительный просмотр файла. Для полного просмотра скачайте документ.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Предварительный просмотр</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Для просмотра содержимого документа скачайте файл на ваше устройство
                  </p>
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Скачать документ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Информация о документе
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Название</p>
                <p className="text-sm text-gray-900">{document.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Тип документа</p>
                <p className="text-sm text-gray-900">{document.type}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Статус</p>
                {getStatusBadge(document.status)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Размер файла</p>
                <p className="text-sm text-gray-900">{document.fileSize}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Объект</p>
                <p className="text-sm text-gray-900 flex items-start gap-2">
                  <Building2 className="w-4 h-4 mt-0.5" />
                  {document.objectAddress}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Дата загрузки</p>
                <p className="text-sm text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(document.uploadDate).toLocaleDateString("ru-RU")}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Описание</p>
                <p className="text-sm text-gray-600">{document.description}</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
                <Button variant="outline" onClick={onBack} className="w-full bg-transparent">
                  Закрыть просмотр
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
