import { PartnerService } from "@/components/dashboard/partners/partner-service"

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Партнерский сервис</h1>
        <p className="text-gray-600">Управление заказами, контрагентами и отслеживание партнерских доходов</p>
      </div>
      <PartnerService />
    </div>
  )
}
