import { DocumentsManager } from "@/components/dashboard/documents/documents-manager"

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Документы</h1>
        <p className="text-gray-600">Управление документами для подписи и загрузка подписанных материалов</p>
      </div>
      <DocumentsManager />
    </div>
  )
}
