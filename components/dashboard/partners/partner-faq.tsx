"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqData = [
  {
    id: "1",
    question: "Как работает партнерская программа?",
    answer:
      "Вы привлекаете клиентов к нашим услугам и получаете комиссию с каждого заказа. Комиссия составляет 15% от стоимости выполненных работ. Выплаты производятся после завершения работ и получения оплаты от клиента.",
  },
  {
    id: "2",
    question: "Как создать заявку для контрагента?",
    answer:
      "Перейдите в раздел 'Заказы' и нажмите 'Создать заявку'. Выберите тип услуги, укажите адрес объекта, кадастровый номер (если известен) и контрагента. После отправки заявки мы рассчитаем стоимость работ и уведомим вас.",
  },
  {
    id: "3",
    question: "Как добавить нового контрагента?",
    answer:
      "В разделе 'Мои контрагенты' нажмите 'Добавить контрагента' и заполните персональные данные: ФИО, паспортные данные, контактную информацию. Все данные надежно защищены и используются только для оформления документов.",
  },
  {
    id: "4",
    question: "Когда и как выплачивается комиссия?",
    answer:
      "Комиссия начисляется после полного завершения работ и получения оплаты от клиента. Вы можете запросить вывод средств в разделе 'Партнерская программа'. Минимальная сумма для вывода - 5,000 рублей. Выплаты производятся в течение 3-5 рабочих дней.",
  },
  {
    id: "5",
    question: "Какие документы нужны от контрагента?",
    answer:
      "Для выполнения кадастровых работ необходимы паспортные данные заказчика, СНИЛС, документы на объект (если имеются). Вы можете заполнить эти данные в карточке контрагента или попросить клиента предоставить их позже.",
  },
  {
    id: "6",
    question: "Как отследить статус заявки?",
    answer:
      "В разделе 'Заказы' отображается актуальный статус каждой заявки: 'Идет расчет стоимости работ', 'Готово к принятию', 'Принято', 'Отклонено'. При изменении статуса вы получите уведомление.",
  },
  {
    id: "7",
    question: "Можно ли отказаться от заявки после расчета стоимости?",
    answer:
      "Да, после получения коммерческого предложения вы можете принять его или отказаться. Отказ не влияет на вашу репутацию в системе, но мы рекомендуем обсуждать примерную стоимость с клиентом заранее.",
  },
  {
    id: "8",
    question: "Как работает реферальная программа?",
    answer:
      "Поделитесь своей реферальной ссылкой с потенциальными партнерами. Когда они регистрируются по вашей ссылке и начинают работать, вы получаете дополнительный бонус с их первых заказов. Подробности уточняйте у менеджера.",
  },
]

export function PartnerFAQ() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Часто задаваемые вопросы
          </CardTitle>
          <CardDescription>Ответы на основные вопросы по работе с партнерским сервисом</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Нужна дополнительная помощь?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">Если вы не нашли ответ на свой вопрос, свяжитесь с нашей службой поддержки:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Телефон поддержки</h4>
                <p className="text-gray-600">+7 (999) 123-45-67</p>
                <p className="text-sm text-gray-500">Пн-Пт: 9:00-18:00</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Email поддержки</h4>
                <p className="text-gray-600">partners@crm-cabinet.com</p>
                <p className="text-sm text-gray-500">Ответ в течение 24 часов</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
