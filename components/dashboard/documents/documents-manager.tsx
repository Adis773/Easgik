"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentsForSigning } from "./documents-for-signing"
import { SignedDocuments } from "./signed-documents"
import { FileText, Upload } from "lucide-react"

export function DocumentsManager() {
  const [activeTab, setActiveTab] = useState("for-signing")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="for-signing" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Для подписи
        </TabsTrigger>
        <TabsTrigger value="signed" className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Подписанные
        </TabsTrigger>
      </TabsList>

      <TabsContent value="for-signing" className="mt-6">
        <DocumentsForSigning />
      </TabsContent>

      <TabsContent value="signed" className="mt-6">
        <SignedDocuments />
      </TabsContent>
    </Tabs>
  )
}
