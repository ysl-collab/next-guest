import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { Item, ItemContent, ItemMedia, ItemTitle, ItemActions } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contacts() {
    const contacts = [
        {
            icon: <MapPin className="size-5 text-primary" />,
            title: "Адрес",
            value: "г. Нефтекамск, улица Ленина 19Г",
            description: 'ресторан "В ГОСТИ"',
            action: "Построить маршрут",
            link: "https://maps.yandex.ru"
        },
        {
            icon: <Phone className="size-5 text-primary" />,
            title: "Телефон",
            value: "+7 (917) 773-05-05",
            description: "Ежедневно с 12:00 до 23:00",
            action: "Позвонить",
            link: "tel:+79177730505"
        },
        {
            icon: <Mail className="size-5 text-primary" />,
            title: "Email",
            value: "info@vgosti.ru",
            description: "Для вопросов и предложений",
            action: "Написать",
            link: "mailto:info@vgosti.ru"
        },
        {
            icon: <MessageCircle className="size-5 text-primary" />,
            title: "Бронирование",
            value: "Времено недоступно",
            description: "Бронируйте столик онлайн 24/7",
            action: "Забронировать",
            link: "/booking"
        }
    ];

    const socials = [
        { icon: <Instagram className="size-5" />, name: "Instagram", link: "https://instagram.com", color: "hover:text-pink-600", followers: "15.5K" },
        { icon: <Youtube className="size-5" />, name: "YouTube", link: "https://youtube.com", color: "hover:text-red-600", followers: "24K" },
        { icon: <Facebook className="size-5" />, name: "Facebook", link: "https://facebook.com", color: "hover:text-blue-600", followers: "12K" },
        { icon: <Twitter className="size-5" />, name: "Twitter", link: "https://twitter.com", color: "hover:text-sky-500", followers: "8.2K" }
    ];

    const workingHours = [
        { day: "Понедельник - Четверг", hours: "12:00 - 23:00", status: "Открыто" },
        { day: "Пятница - Суббота", hours: "12:00 - 01:00", status: "Открыто" },
        { day: "Воскресенье", hours: "13:00 - 23:00", status: "Открыто" }
    ];

    return (
        <div className="py-10 space-y-12">
            {/* Заголовок */}
            <div className="text-center space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
                    Свяжитесь с нами
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold">Контакты</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Мы всегда рады ответить на ваши вопросы и помочь с бронированием.
                    Свяжитесь с нами любым удобным способом.
                </p>
            </div>

            {/* Основные контакты в сетке */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contacts.map((contact, index) => (
                    <Item
                        key={index}
                        variant="outline"
                        size="lg"
                        className="group hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] flex items-center gap-4 p-4"
                    >
                        <ItemMedia className="group-hover:scale-110 transition-transform">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                {contact.icon}
                            </div>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="text-lg font-semibold">{contact.title}</ItemTitle>
                            <p className="text-sm font-medium">{contact.value}</p>
                            <p className="text-sm text-muted-foreground">{contact.description}</p>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="ghost" size="sm" asChild>
                                <a href={contact.link} target={contact.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                                    {contact.action}
                                </a>
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
            </div>

            {/* Карта и часы работы */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Карта */}
                <Card className="lg:col-span-2 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="size-5 text-primary" />
                            Мы на карте
                        </CardTitle>
                        <CardDescription>
                            г. Нефтекамск, улица Ленина 19Г (ресторан "В ГОСТИ")
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full h-[300px] bg-muted">
                            {/* Яндекс Карта с пином на ресторан */}
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?ll=54.248697%2C56.088164&z=17&pt=54.248697%2C56.088164%2Cpm2rdm&l=map&mode=search&text=Нефтекамск%2C%20улица%20Ленина%2019Г%20В%20ГОСТИ"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Карта"
                                className="absolute inset-0"
                                allowFullScreen
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Часы работы */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="size-5 text-primary" />
                            Часы работы
                        </CardTitle>
                        <CardDescription>
                            Когда мы открыты для вас
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {workingHours.map((schedule, index) => (
                            <Item key={index} variant="ghost" size="sm" className="w-full">
                                <ItemMedia>
                                    <Clock className="size-4 text-primary" />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="flex items-center justify-between w-full text-sm">
                                        <span>{schedule.day}</span>
                                        <span className="font-mono">{schedule.hours}</span>
                                    </ItemTitle>
                                </ItemContent>
                                <ItemActions>
                                    <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500">
                                        {schedule.status}
                                    </Badge>
                                </ItemActions>
                            </Item>
                        ))}
                        <div className="pt-3 border-t">
                            <p className="text-sm text-muted-foreground">
                                * В праздничные дни часы работы могут меняться. Следите за анонсами в соцсетях.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Форма обратной связи и соцсети */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Форма обратной связи */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Send className="size-5 text-primary" />
                            Напишите нам
                        </CardTitle>
                        <CardDescription>
                            Заполните форму и мы свяжемся с вами в ближайшее время
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="Ваше имя" />
                            <Input placeholder="Ваш телефон" />
                        </div>
                        <Input placeholder="Ваш email" />
                        <Textarea placeholder="Ваше сообщение" rows={4} />
                        <Button className="w-full">
                            <Send className="size-4 mr-2" />
                            Отправить сообщение
                        </Button>
                    </CardContent>
                </Card>

                {/* Социальные сети */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="size-5 text-primary" />
                            Мы в соцсетях
                        </CardTitle>
                        <CardDescription>
                            Подписывайтесь, чтобы быть в курсе новостей и акций
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-all group"
                                >
                                    <div className={`${social.color} transition-colors`}>
                                        {social.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">{social.name}</p>
                                        <p className="text-xs text-muted-foreground">{social.followers} подписчиков</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-center text-muted-foreground">
                                Подпишитесь на нашу рассылку и получите скидку 10% на первый заказ!
                            </p>
                            <div className="flex gap-2 mt-3">
                                <Input placeholder="Ваш email" className="bg-background" />
                                <Button size="sm">Подписаться</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Phone className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Горячая линия</p>
                            <p className="text-lg font-semibold">8-800-123-45-67</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Clock className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Время работы</p>
                            <p className="text-lg font-semibold">Ежедневно с 12:00 до 23:00</p>
                        </div>
                    </div>
                    <Badge variant="default" className="px-4 py-2 text-base">
                        Связаться с оператором
                    </Badge>
                </div>
            </div>
        </div>
    );
}