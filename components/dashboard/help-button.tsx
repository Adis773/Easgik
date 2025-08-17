"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle, User, Building2, ShoppingBag, FileText, Users, Bell } from "lucide-react"

export function HelpButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Подробная инструкция по работе с личным кабинетом ЕСГИК</DialogTitle>
          <DialogDescription>
            Полное руководство по использованию всех функций вашего персонального кабинета
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Система уведомлений</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Колокольчик (Уведомления):</strong> Показывает важные события - новые документы для подписи,
                    необходимость заполнения профиля. Нажмите на колокольчик, чтобы увидеть все уведомления.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Значок вопроса (Помощь):</strong> Открывает эту инструкцию с подробным описанием всех
                    функций личного кабинета.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Раздел "Профиль"</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Контактная информация:</strong> Обновляйте имя, фамилию, отчество, email и телефон.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Способы оплаты:</strong> Выберите удобный вариант - наличные, банковский перевод, QR-код или
                    оплата по реквизитам.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Получение документов:</strong> Укажите как получать готовые документы - в офисе, доставка
                    сотрудником, Яндекс Доставка или СДЭК.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Промокоды:</strong> Вводите промокоды для получения скидок. Сумма к оплате автоматически
                    пересчитается.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Раздел "Персональные данные"</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Введите паспортные данные (серия, номер, кем и когда выдан, прописка) и СНИЛС. Если данные уже есть
                    в нашей CRM, они подтянутся автоматически.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Загрузка фото документов:</strong> Загрузите фотографии документов, и наши сотрудники сами
                    заполнят все поля, экономя ваше время.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Раздел "Объекты" (Мои объекты)</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Центральный пункт управления всеми заказами. По каждому объекту доступна информация:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
                    <li>
                      • <strong>Статус работ:</strong> Текущий этап выполнения
                    </li>
                    <li>
                      • <strong>Адрес и кадастровый номер:</strong> Точная идентификация объекта
                    </li>
                    <li>
                      • <strong>Вид работ:</strong> Какая услуга выполняется
                    </li>
                    <li>
                      • <strong>Специалисты:</strong> ФИО кадастрового инженера и геодезиста
                    </li>
                    <li>
                      • <strong>Дата выезда:</strong> Когда специалист приедет на объект
                    </li>
                    <li>
                      • <strong>Стоимость:</strong> Актуальная цена за услугу
                    </li>
                    <li>
                      • <strong>Персональный менеджер:</strong> Ваш закрепленный менеджер
                    </li>
                    <li>
                      • <strong>Чат с менеджером:</strong> Прямая связь для вопросов
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Раздел "Услуги"</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Полный каталог геодезических и кадастровых услуг с описаниями и ценами:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
                    <li>• Межевой план (от 14 000 руб.)</li>
                    <li>• Технический план (от 14 000 руб.)</li>
                    <li>• Акт обследования (от 8 000 руб.)</li>
                    <li>• Топографическая съемка (от 12 000 руб.)</li>
                    <li>• Вынос границ (от 800 руб.)</li>
                    <li>• Схема ЗУ на КПТ (от 10 000 руб.)</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    После заказа услуга автоматически появится в разделе "Объекты".
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Раздел "Документы"</h3>
                  <p className="text-sm text-gray-600 mt-1">Централизованное хранилище документов с двумя разделами:</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Документы для подписи:</strong> Документы от компании, требующие вашего подписания
                    (договоры, акты). Доступен предварительный просмотр.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Подписанные документы:</strong> Загружайте сюда подписанные документы для отправки нам.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Все операции с документами происходят онлайн, без визитов в офис.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Раздел "Сервис партнерств"</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Специальный раздел для партнеров (риелторы, агенты) с функциями:
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Заказы:</strong> Создание заявок для клиентов, отслеживание статуса, просмотр коммерческих
                    предложений.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Мои контрагенты:</strong> Управление данными привлеченных заказчиков.
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Партнерская программа:</strong> Реферальная ссылка, контроль баланса, запрос вывода средств,
                    детализация заработка.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Контакты для поддержки</h3>
              <p className="text-sm text-gray-600">
                <strong>ЕСГИК - Единая служба геодезии и кадастра</strong>
                <br />
                Адрес: г. Орехово-Зуево, ул. Бабушкина д.2а, 5 этаж, офис 10
                <br />
                Телефон: 8 (495) 127 75-73
                <br />
                Обслуживаемая территория: г. Орехово-Зуево и район, Павловский Посад, Воскресенск, Шатура, Электрогорск,
                Ликино-Дулёво
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
