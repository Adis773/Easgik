import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProfileOverview } from "@/components/dashboard/profile-overview"
import { PaymentSummary } from "@/components/dashboard/payment-summary"
import { NotificationBell } from "@/components/dashboard/notification-bell"
import { HelpButton } from "@/components/dashboard/help-button"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with notifications and help */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Личный кабинет</h1>
            <p className="text-gray-600">Добро пожаловать в систему управления услугами</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <HelpButton />
          </div>
        </div>

        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileOverview />
          </div>
          <div>
            <PaymentSummary />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
