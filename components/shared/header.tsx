"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Button, Checkbox, InputOTP, InputOTPGroup, InputOTPSlot, TelegramAuth, Toggle } from "../ui";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldContent, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu, X, Home, Info, Phone, Mail, Gift, HelpCircle, Utensils, Bike, Calendar, Users } from "lucide-react"
import { InputOTPSeparator } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { toast } from "sonner";

interface Props {
    className?: string;
}

const components: { title: string; href: string; description: string; icon?: React.ReactNode }[] = [
    {
        title: "О нас",
        href: "/about",
        description: "Узнайте больше о нашей истории, миссии и ценностях.",
        icon: <Info className="h-4 w-4" />,
    },
    {
        title: "Контакты",
        href: "/contacts",
        description: "Свяжитесь с нами для получения дополнительной информации.",
        icon: <Phone className="h-4 w-4" />,
    },
    {
        title: "Цели",
        href: "/goals",
        description: "Узнайте о наших целях и миссии.",
        icon: <Users className="h-4 w-4" />,
    },
    {
        title: "Акции и скидки",
        href: "/discounts",
        description: "Узнайте о наших текущих акциях и скидках.",
        icon: <Gift className="h-4 w-4" />,
    },
    {
        title: "FAQ",
        href: "/faq",
        description: "Ответы на часто задаваемые вопросы.",
        icon: <HelpCircle className="h-4 w-4" />,
    },
];

const services: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
    {
        title: "Наше меню",
        href: "/",
        description: "Ознакомьтесь с нашим меню и выберите блюда по вкусу.",
        icon: <Utensils className="h-4 w-4" />,
    },
    {
        title: "Заказать доставку",
        href: "/order",
        description: "Привезем еду из ресторана прямо к вам домой.",
        icon: <Bike className="h-4 w-4" />,
    },
    {
        title: "Забронировать столик",
        href: "/booking",
        description: "Забронируйте столик в нашем ресторане.",
        icon: <Calendar className="h-4 w-4" />,
    },
];

// Функция для форматирования номера телефона
const formatPhoneNumber = (value: string) => {
    // Удаляем все нецифровые символы
    const numbers = value.replace(/\D/g, '');

    // Если номер пустой, возвращаем пустую строку
    if (!numbers) return '';

    // Форматируем номер: +7 (XXX) XXX-XX-XX
    if (numbers.length <= 1) {
        return `+7 (${numbers}`;
    } else if (numbers.length <= 4) {
        return `+7 (${numbers.slice(1, 4)}`;
    } else if (numbers.length <= 7) {
        return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`;
    } else if (numbers.length <= 9) {
        return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    } else {
        return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
    }
};

// Функция для валидации номера телефона (проверяем, что введено 11 цифр)
const isValidPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11; // +7 и 10 цифр = 11
};

export const Header: React.FC<Props> = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otpValue, setOtpValue] = React.useState('');
    const [isAgreed, setIsAgreed] = React.useState(false);

    const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
        // Проверяем, есть ли сохраненная тема в localStorage
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            // Если есть сохраненная тема, используем её, иначе true (темная по умолчанию)
            return savedTheme ? savedTheme === 'dark' : true;
        }
        return true; // По умолчанию темная
    });

    // Обновляем тему при изменении isDarkTheme
    React.useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneNumber(formatted);
    };

    const handleRequestCode = () => {
        console.log('Запрос кода для номера:', phoneNumber);
        // Здесь логика отправки кода
    };

    // Проверяем, валидный ли номер и согласие
    const isPhoneValid = isValidPhoneNumber(phoneNumber);
    const isRequestButtonEnabled = isPhoneValid && isAgreed;

    return (
        <header className={cn("w-full border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
            <Container className="flex items-center justify-between h-14 px-4 md:px-6">
                {/* Логотип */}
                <Link href="/" className="text-xl md:text-2xl font-light font-serif">
                    В ГОСТИ
                </Link>

                {/* Десктопная навигация */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Услуги</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-[400px] p-2">
                                    {services.map((service) => (
                                        <ListItem
                                            key={service.title}
                                            title={service.title}
                                            href={service.href}
                                            icon={service.icon}
                                        >
                                            {service.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Дополнительно</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[500px] grid-cols-2 gap-2 p-2">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                            icon={component.icon}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/social">Социальные сети</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Правая часть с кнопками - все в одной строке */}
                <div className="flex items-center gap-2">
                    {/* Группа кнопок для десктопа - тема и вход в одной строке */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Диалог входа для десктопа */}
                        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round">
                                        <path d="M18 20a6 6 0 0 0-12 0" />
                                        <circle cx="12" cy="10" r="4" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span className="hidden lg:inline">Войти</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm w-[95%] rounded-lg">
                                <DialogHeader>
                                    <DialogTitle>Войти в аккаунт</DialogTitle>
                                    <DialogDescription>
                                        Введите свой номер телефона для входа в аккаунт.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <FieldGroup className="space-y-4">
                                        <Field>
                                            <Label htmlFor="phone">Номер телефона</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+7 (999) 123-45-67"
                                                className="h-10"
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
                                            />
                                            {phoneNumber && !isPhoneValid && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    Введите корректный номер телефона (11 цифр)
                                                </p>
                                            )}
                                        </Field>
                                        <Field>
                                            <div className="w-full flex-col gap-4 flex items-center justify-center">
                                                <Label htmlFor="code">Код подтверждения</Label>
                                                <InputOTP
                                                    maxLength={6}
                                                    value={otpValue}
                                                    onChange={setOtpValue}
                                                    pattern={REGEXP_ONLY_DIGITS}
                                                    className="flex items-center justify-center"
                                                >
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>

                                        </Field>
                                        <FieldLabel>
                                            <Field orientation="horizontal" className="items-center">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    checked={isAgreed}
                                                    onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                                                />
                                                <FieldContent>
                                                    <FieldTitle className="text-sm">
                                                        Я согласен с политикой обработки персональных данных
                                                    </FieldTitle>
                                                </FieldContent>
                                            </Field>
                                        </FieldLabel>
                                    </FieldGroup>
                                    <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
                                        <TelegramAuth />
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Корзина */}
                    <Link href="/cart" className="flex gap-1 bg-primary px-[10px] h-8 rounded-md items-center px-2 md:px-3">
                        <p className="ml-1 text-[14px] flex gap-1 items-center justify-center">
                            <span id="cart_summart">0</span>
                            ₽
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <path d="M3 6h18" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </Link>

                    {/* Мобильное меню */}
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
                            <SheetHeader className="p-4 border-b">
                                <SheetTitle className="flex items-center justify-between">
                                    <span className="font-serif font-light text-xl">В ГОСТИ</span>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </SheetClose>
                                </SheetTitle>
                                <SheetDescription className="text-left">
                                    Меню навигации по сайту
                                </SheetDescription>
                            </SheetHeader>

                            <div className="overflow-y-auto h-full pb-20">
                                {/* Профиль и тема */}
                                <div className="p-4 border-b space-y-3">
                                    {/* Кнопка входа для мобильной версии */}
                                    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full gap-2"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 20a6 6 0 0 0-12 0" />
                                                    <circle cx="12" cy="10" r="4" />
                                                    <circle cx="12" cy="12" r="10" />
                                                </svg>
                                                Войти в аккаунт
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                </div>

                                {/* Навигация */}
                                <div className="p-4 space-y-4">
                                    {/* Услуги */}
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">УСЛУГИ</h3>
                                        <div className="space-y-1">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.title}
                                                    href={service.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                                >
                                                    <div className="text-muted-foreground">{service.icon}</div>
                                                    <div>
                                                        <div className="text-sm font-medium">{service.title}</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1">
                                                            {service.description}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Дополнительно */}
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">ДОПОЛНИТЕЛЬНО</h3>
                                        <div className="grid grid-cols-1 gap-1">
                                            {components.map((component) => (
                                                <Link
                                                    key={component.title}
                                                    href={component.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                                >
                                                    <div className="text-muted-foreground">{component.icon}</div>
                                                    <div>
                                                        <div className="text-sm font-medium">{component.title}</div>
                                                        <div className="text-xs text-muted-foreground line-clamp-1">
                                                            {component.description}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Социальные сети */}
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">СОЦИАЛЬНЫЕ СЕТИ</h3>
                                        <Link
                                            href="/social"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                        >
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="text-sm font-medium">Социальные сети</div>
                                                <div className="text-xs text-muted-foreground">
                                                    Наши страницы в соцсетях
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    )
}

// Улучшенный ListItem компонент
function ListItem({
    title,
    children,
    href,
    icon,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; icon?: React.ReactNode }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        {icon}
                        <span>{title}</span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}