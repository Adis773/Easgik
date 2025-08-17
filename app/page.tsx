"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Users, Award, Shield, Star, CheckCircle } from "lucide-react"

export default function HomePage() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">ЕСГИК</h1>
              <p className="text-blue-200">Единая служба геодезии и кадастра</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth">
                <Button variant="outline" className="text-blue-900 border-white hover:bg-white bg-transparent">
                  Войти в кабинет
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Единая служба геодезии и кадастра</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Кадастровые и геодезические работы в день обращения. Пожизненная гарантия на кадастровые услуги. Обслуживаем
            Орехово-Зуево, Павловский Посад, Воскресенск, Шатуру, Электрогорск, Ликино-Дулёво.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Личный кабинет
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={scrollToServices}>
              Наши услуги
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Наши услуги</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Межевой план</CardTitle>
                <CardDescription>от 14 000 руб.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Уточнение, образование, раздел, объединение, перераспределение земельных участков.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Перераспределение с гос. собственностью</li>
                  <li>• Полное сопровождение в Росреестре</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Технический план</CardTitle>
                <CardDescription>от 14 000 руб.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Регистрация жилых домов, садовых домов, бань, гаражей, хозблоков.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Внесение изменений (реконструкция)</li>
                  <li>• Перевод из садового в жилой дом</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Топографическая съемка</CardTitle>
                <CardDescription>от 12 000 руб.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Для ландшафтного дизайна, проектных работ, раздела участков.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Высокая точность измерений</li>
                  <li>• Сертифицированное оборудование</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Вынос границ</CardTitle>
                <CardDescription>от 800 руб.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Вынос поворотных точек границ земельного участка на местности.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Схема ЗУ на КПТ</CardTitle>
                <CardDescription>от 10 000 руб.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Для аукциона, перераспределение с гос. собственностью (прирезка).</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Акт обследования</CardTitle>
                <CardDescription>от 8 000 руб.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Снятие объектов недвижимости с кадастрового и регистрационного учета.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Наши преимущества</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Оперативность</h4>
              <p className="text-gray-600">Кадастровые и геодезические работы в день обращения</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Пожизненная гарантия</h4>
              <p className="text-gray-600">На все кадастровые услуги</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Прозрачное ценообразование</h4>
              <p className="text-gray-600">Стоимость не меняется по ходу работ</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Высокая точность</h4>
              <p className="text-gray-600">Сертифицированное оборудование, ежегодный контроль точности</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Удобство выезда</h4>
              <p className="text-gray-600">Инженер приезжает сразу или в удобное время</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Бесплатные консультации</h4>
              <p className="text-gray-600">Консультации специалистов без оплаты</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Наша команда</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold">Артем Бирюков</h4>
                <p className="text-sm text-gray-600">Кадастровый инженер</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold">Егор Никонов</h4>
                <p className="text-sm text-gray-600">Инженер геодезист</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold">Алина Конина</h4>
                <p className="text-sm text-gray-600">Помощник геодезиста</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold">София Макарова</h4>
                <p className="text-sm text-gray-600">Помощник кадастрового инженера</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold">Елена Першина</h4>
                <p className="text-sm text-gray-600">Администратор</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">О компании ЕСГИК</h3>
              <p className="text-gray-600 mb-6">
                Единая служба геодезии и кадастра - ведущая компания в сфере кадастровых и геодезических услуг. Мы
                обладаем собственной автоматизированной информационной системой ведения кадастровых работ, не имеющей
                аналогов на рынке.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">1000+</div>
                    <div className="text-sm text-gray-600">Довольных клиентов</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">15+</div>
                    <div className="text-sm text-gray-600">Лет опыта</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">Пожизненная</div>
                    <div className="text-sm text-gray-600">Гарантия</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold">В день</div>
                    <div className="text-sm text-gray-600">Обращения</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-6">Свяжитесь с нами</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Адрес офиса</div>
                    <div className="text-gray-600">г. Орехово-Зуево, ул. Бабушкина д.2а, 5 этаж, офис 10</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-gray-600">8 (495) 127 75-73</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">info@esgik.ru</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Режим работы</div>
                    <div className="text-gray-600">Пн-Пт: 9:00-18:00, Сб: 10:00-15:00</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Обслуживаемая территория</div>
                    <div className="text-gray-600 text-sm">
                      Орехово-Зуево, Павловский Посад, Воскресенск, Шатура, Электрогорск, Ликино-Дулёво
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/auth">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Войти в личный кабинет</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">ЕСГИК</h5>
              <p className="text-gray-400">
                Единая служба геодезии и кадастра. Пожизненная гарантия на кадастровые услуги.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Межевой план</li>
                <li>Технический план</li>
                <li>Топографическая съемка</li>
                <li>Вынос границ</li>
                <li>Схема ЗУ на КПТ</li>
                <li>Акт обследования</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-gray-400">
                <div>8 (495) 127 75-73</div>
                <div>info@esgik.ru</div>
                <div>г. Орехово-Зуево, ул. Бабушкина д.2а, 5 этаж, офис 10</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ЕСГИК. Политика конфиденциальности.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
