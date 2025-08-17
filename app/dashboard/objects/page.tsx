import { ObjectsList } from "@/components/dashboard/objects/objects-list"

export default function ObjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Объекты</h1>
        <p className="text-gray-600">Управление вашими объектами и отслеживание статуса работ</p>
      </div>
      <ObjectsList />
    </div>
  )
}
