import Image from "next/image";
import { Item, ItemContent, ItemMedia, ItemTitle, ItemActions } from "@/components/ui/item";
import { 
    Clock, 
    MapPin, 
    Phone, 
    Mail, 
    Calendar, 
    Users, 
    ChefHat, 
    Award,
    CreditCard,
    Wifi,
    Car,
    Dog
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui";

export default function About() {
    const workingHours = [
        { day: "Понедельник - Четверг", hours: "12:00 - 23:00", isWeekend: false },
        { day: "Пятница - Суббота", hours: "12:00 - 01:00", isWeekend: true },
        { day: "Воскресенье", hours: "13:00 - 23:00", isWeekend: true }
    ];

    const features = [
        {
            icon: <Users className="size-5 text-primary" />,
            title: "Вместимость",
            description: "До 80 гостей одновременно, банкетный зал на 40 человек"
        },
        {
            icon: <ChefHat className="size-5 text-primary" />,
            title: "Шеф-повар",
            description: 'Алексей Петров, победитель кулинарного конкурса "Шеф года" 2024"'
        },
        {
            icon: <Award className="size-5 text-primary" />,
            title: "Награды",
            description: "Лучший ресторан года 2023, Премия качества 2024"
        },
        {
            icon: <CreditCard className="size-5 text-primary" />,
            title: "Оплата",
            description: "Наличные, банковские карты, Apple Pay, Google Pay"
        },
        {
            icon: <Wifi className="size-5 text-primary" />,
            title: "Удобства",
            description: "Бесплатный Wi-Fi, детские стульчики, кондиционер"
        },
        {
            icon: <Car className="size-5 text-primary" />,
            title: "Парковка",
            description: "Бесплатная парковка для гостей на 20 мест"
        },
        {
            icon: <Dog className="size-5 text-primary" />,
            title: "Животные",
            description: "Разрешены небольшие собаки на поводке"
        }
    ];

    const contacts = [
        {
            icon: <MapPin className="size-4" />,
            label: "Адрес",
            value: "г. Москва, ул. Тверская, д. 15",
            link: "https://maps.yandex.ru"
        },
        {
            icon: <Phone className="size-4" />,
            label: "Телефон",
            value: "+7 (495) 123-45-67",
            link: "tel:+74951234567"
        },
        {
            icon: <Mail className="size-4" />,
            label: "Email",
            value: "info@vgosti.ru",
            link: "mailto:info@vgosti.ru"
        },
        {
            icon: <Calendar className="size-4" />,
            label: "Бронирование",
            value: "online.vgosti.ru",
            link: "/booking"
        }
    ];

    return (
        <div className="py-10 space-y-12">
            {/* Заголовок с изображением */}
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                <Image 
                        src="/images/rest.webp" 
                        alt="Ресторан В ГОСТИ" 
                        fill 
                        className="object-cover"
                        priority
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                        Добро пожаловать
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">Ресторан "В ГОСТИ"</h1>
                    <p className="text-lg text-white/90 max-w-2xl">
                        Уютное место для встреч с друзьями и семейных обедов
                    </p>
                </div>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Левая колонка - описание */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">О нас</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Мы гордимся тем, что предлагаем нашим гостям не только вкусные блюда, 
                            но и уникальную атмосферу, которая делает каждый визит незабываемым. 
                            Наша команда профессиональных поваров и дружелюбного персонала всегда 
                            готова обеспечить вам лучший сервис и создать для вас идеальное место 
                            для отдыха и наслаждения едой.
                        </p>
                    </div>
                    
                    <div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Мы используем только свежие и качественные ингредиенты, чтобы создавать 
                            блюда, которые радуют глаз и восхищают вкус. Наша кухня вдохновлена 
                            разнообразными кулинарными традициями, что позволяет нам предлагать 
                            широкий ассортимент блюд, от классических до современных. Мы стремимся 
                            к тому, чтобы каждый гость чувствовал себя особенным и уходил от нас 
                            с улыбкой на лице.
                        </p>
                    </div>

                    {/* Блок с часами работы в виде Item */}
                    <div className="space-y-3 mt-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Clock className="size-5 text-primary" />
                            Часы работы
                        </h3>
                        {workingHours.map((schedule, index) => (
                            <Item key={index} variant="outline" size="sm" className="w-full">
                                <ItemMedia>
                                    <Clock className={`size-4 ${schedule.isWeekend ? 'text-green-500' : 'text-blue-500'}`} />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="flex items-center justify-between w-full">
                                        <span>{schedule.day}</span>
                                        <span className={`font-mono ${schedule.isWeekend ? 'text-green-500' : 'text-blue-500'}`}>
                                            {schedule.hours}
                                        </span>
                                    </ItemTitle>
                                </ItemContent>
                                {schedule.isWeekend && (
                                    <ItemActions>
                                        <Badge variant="secondary" className="text-xs">Выходной день</Badge>
                                    </ItemActions>
                                )}
                            </Item>
                        ))}
                    </div>
                </div>

                {/* Правая колонка - контакты и особенности */}
                <div className="space-y-6">
                    {/* Контакты */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Контакты</CardTitle>
                            <CardDescription>Свяжитесь с нами любым удобным способом</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {contacts.map((contact, index) => (
                                <Item key={index} variant="ghost" size="sm" asChild className="w-full hover:bg-accent">
                                    <a href={contact.link} target={contact.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                                        <ItemMedia className="text-primary">
                                            {contact.icon}
                                        </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle className="text-sm">
                                                <span className="text-muted-foreground mr-2">{contact.label}:</span>
                                                {contact.value}
                                            </ItemTitle>
                                        </ItemContent>
                                        <ItemActions>
                                            <Badge variant="outline" className="text-xs">Связаться</Badge>
                                        </ItemActions>
                                    </a>
                                </Item>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Особенности */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Особенности</CardTitle>
                            <CardDescription>Что мы предлагаем нашим гостям</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {features.slice(0, 4).map((feature, index) => (
                                <Item key={index} variant="ghost" size="sm">
                                    <ItemMedia>
                                        {feature.icon}
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle className="text-sm">
                                            <span className="font-medium">{feature.title}:</span>{' '}
                                            <span className="text-muted-foreground">{feature.description}</span>
                                        </ItemTitle>
                                    </ItemContent>
                                </Item>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Дополнительные преимущества */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {features.slice(4).map((feature, index) => (
                    <Item key={index} variant="outline" size="lg" className="group hover:bg-accent/50 transition-colors p-4 flex items-center gap-4">
                        <ItemMedia className="group-hover:scale-110 transition-transform">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                {feature.icon}
                            </div>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="font-semibold">{feature.title}</ItemTitle>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </ItemContent>
                    </Item>
                ))}
            </div>

            {/* Призыв к действию */}
            <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border text-center">
                <h3 className="text-2xl font-semibold mb-3">Приходите к нам в гости!</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Окунитесь в мир вкусов и ароматов, который мы с любовью создаем для вас каждый день. 
                    Мы с нетерпением ждем возможности приветствовать вас в нашем ресторане и сделать ваш визит незабываемым!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Badge variant="default" className="px-4 py-2 text-base">
                        Забронировать столик
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 text-base">
                        Посмотреть меню
                    </Badge>
                </div>
            </div>
        </div>
    );
}