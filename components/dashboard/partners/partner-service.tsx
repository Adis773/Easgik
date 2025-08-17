"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PartnerOrders } from "./partner-orders"
import { PartnerClients } from "./partner-clients"
import { PartnerProgram } from "./partner-program"
import { PartnerFAQ } from "./partner-faq"
import { ShoppingBag, Users, TrendingUp, HelpCircle } from "lucide-react"

export function PartnerService() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="orders" className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Заказы
        </TabsTrigger>
        <TabsTrigger value="clients" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Мои контрагенты
        </TabsTrigger>
        <TabsTrigger value="program" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Партнерская программа
        </TabsTrigger>
        <TabsTrigger value="faq" className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          FAQ
        </TabsTrigger>
      </TabsList>

      <TabsContent value="orders" className="mt-6">
        <PartnerOrders />
      </TabsContent>

      <TabsContent value="clients" className="mt-6">
        <PartnerClients />
      </TabsContent>

      <TabsContent value="program" className="mt-6">
        <PartnerProgram />
      </TabsContent>

      <TabsContent value="faq" className="mt-6">
        <PartnerFAQ />
      </TabsContent>
    </Tabs>
  )
}
