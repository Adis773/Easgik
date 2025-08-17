"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, X, Check, Calendar, Building2 } from "lucide-react"

// Mock signed documents data
const mockSignedDocuments = [
  {
    id: "SIGNED-001",
    name: "Технический план квартиры (подписанный)",
    originalDocId: "DOC-001",
    objectId: "OBJ-001",
    objectAddress: "г. Москва, ул. Ленина, д. 10, кв. 25",
    uploadDate: "2024-01-19T15:30:00Z",
    status: "uploaded",
    fileSize: "2.6 MB",
  },
]

export function SignedDocuments() {
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])
  const [signedDocuments, setSignedDocuments] = useState(mockSignedDocuments)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type === "application/pdf" || file.type.startsWith("image/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit

      if (!isValidType) {
        toast({
          title: "Неподдерживаемый формат файла",
          description: `Файл "${file.name}" имеет неподдерживаемый формат. Поддерживаются PDF и изображения.`,
          variant: "destructive",
        })
        return false
      }

      if (!isValidSize) {
        toast({
          title: "Файл слишком большой",
          description: `Файл "${file.name}" превышает максимальный размер 10MB.`,
          variant: "destructive",
        })
        return false
      }

      return true
    })

    setUploadingFiles((prev) => [...prev, ...validFiles])
  }

  const removeUploadingFile = (index: number) => {
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (uploadingFiles.length === 0) return

    try {
      // TODO: Replace with actual file upload to server/CRM
      console.log("Uploading files:", uploadingFiles)

      // Simulate upload process
      for (const file of uploadingFiles) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const newSignedDoc = {
          id: `SIGNED-${Date.now()}`,
          name: file.name,
          originalDocId: "DOC-001", // This should be determined based on the file
          objectId: "OBJ-001",
          objectAddress: "г. Москва, ул. Ленина, д. 10, кв. 25",
          uploadDate: new Date().toISOString(),
          status: "uploaded",
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }

        setSignedDocuments((prev) => [...prev, newSignedDoc])
      }

      setUploadingFiles([])
      toast({
        title: "Файлы загружены успешно",
        description: `Загружено ${uploadingFiles.length} файл(ов). Документы переданы на обработку.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Ошибка загрузки",
        description: "Произошла ошибка при загрузке файлов. Попробуйте еще раз.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Загрузка подписанных документов
          </CardTitle>
          <CardDescription>
            Загрузите подписанные документы для передачи в работу. Поддерживаются форматы: PDF, JPG, PNG (до 10MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Выберите файлы для загрузки</p>
            <p className="text-sm text-gray-600">Нажмите здесь или перетащите файлы в эту область</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {uploadingFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Файлы для загрузки:</h4>
              {uploadingFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeUploadingFile(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={uploadFiles} className="w-full">
                Загрузить файлы ({uploadingFiles.length})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      {signedDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Загруженные документы</h3>
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
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Check className="w-3 h-3 mr-1" />
                      Загружено
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <p className="text-sm font-medium text-gray-700">Размер файла</p>
                      <p className="text-sm text-gray-900">{document.fileSize}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {signedDocuments.length === 0 && uploadingFiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет загруженных документов</h3>
            <p className="text-gray-600">Загрузите подписанные документы для передачи в работу</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
