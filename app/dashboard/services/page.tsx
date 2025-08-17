import { ServicesCatalog } from "@/components/dashboard/services/services-catalog"

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Каталог услуг</h1>
        <p className="text-gray-600">Выберите необходимую услугу для заказа</p>
      </div>
      <ServicesCatalog />
    </div>
  )
}
