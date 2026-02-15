"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Button, Checkbox, InputOTP, InputOTPGroup, InputOTPSlot } from "../ui";
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
    SheetFooter,
} from "@/components/ui/sheet"
import { Menu, X, Info, Phone, Mail, Gift, HelpCircle, Utensils, Bike, Calendar, Users, Minus, Plus, Trash2 } from "lucide-react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context"; // Импортируем хук из контекста

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
        href: "/knowledge",
        description: "Узнать о Нас побольше.",
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
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
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

// Функция для валидации номера телефона
const isValidPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
};

// Вспомогательная функция для склонения слов
function getWordForm(number: number, forms: [string, string, string]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
        number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
    ];
}

export const Header: React.FC<Props> = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otpValue, setOtpValue] = React.useState('');
    const [isAgreed, setIsAgreed] = React.useState(false);

    // Используем хук корзины
    const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

    const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme === 'dark' : true;
        }
        return true;
    });

    // Обновление темы
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

                {/* Правая часть с кнопками */}
                <div className="flex items-center gap-2">
                    {/* Группа кнопок для десктопа */}
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
                                        <Button
                                            variant="default"
                                            onClick={() =>
                                                toast.success("Код отправлен на SMS", {
                                                    description: "Введите 6-значный код из SMS!",
                                                    position: "top-center",
                                                })
                                            }
                                        >
                                            Отправить код
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Корзина */}
                    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex gap-1 bg-primary px-[10px] h-8 rounded-md items-center px-2 md:px-3 hover:bg-primary/90 relative"
                            >
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                                <p className="ml-1 text-[14px] flex gap-1 items-center justify-center">
                                    <span>{totalPrice}</span>
                                    ₽
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <path d="M3 6h18" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
                            <SheetHeader className="p-4 border-b">
                                <SheetTitle className="flex items-center justify-between">
                                    <span>Корзина</span>
                                    {items.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearCart}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            Очистить
                                        </Button>
                                    )}
                                </SheetTitle>
                                <SheetDescription>
                                    {items.length === 0
                                        ? "Ваша корзина пуста"
                                        : `В корзине ${totalItems} ${getWordForm(totalItems, ['товар', 'товара', 'товаров'])}`
                                    }
                                </SheetDescription>
                            </SheetHeader>

                            {items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-24 h-24 mb-4 text-muted-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <path d="M3 6h18" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">Корзина пуста</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Добавьте блюда из меню, чтобы оформить заказ
                                    </p>
                                    <SheetClose asChild>
                                        <Button onClick={() => setIsCartOpen(false)}>
                                            Перейти в меню
                                        </Button>
                                    </SheetClose>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 p-3 rounded-lg border bg-card"
                                            >
                                                {item.image && (
                                                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={80}
                                                            height={80}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div>
                                                            <h4 className="font-medium truncate">{item.name}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.price} ₽
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => removeItem(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {item.options && item.options.length > 0 && (
                                                        <div className="mt-1 text-xs text-muted-foreground">
                                                            {item.options.map(opt => opt.title).join(', ')}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center text-sm">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="ml-auto font-medium">
                                                            {item.price * item.quantity} ₽
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <SheetFooter className="border-t p-4 flex-col gap-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Товаров:</span>
                                                <span>{totalItems} {getWordForm(totalItems, ['шт', 'шт', 'шт'])}</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Итого:</span>
                                                <span>{totalPrice} ₽</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full">
                                            <SheetClose asChild>
                                                <Button variant="outline" className="flex-1">
                                                    Продолжить покупки
                                                </Button>
                                            </SheetClose>
                                            <Button
                                                className="flex-1"
                                                onClick={() => {
                                                    setIsCartOpen(false);
                                                    toast.success('Заказ оформлен!', {
                                                        description: 'Скоро с вами свяжется оператор',
                                                    });
                                                    // Здесь можно добавить логику оформления заказа
                                                }}
                                            >
                                                Оформить заказ
                                            </Button>
                                        </div>
                                    </SheetFooter>
                                </>
                            )}
                        </SheetContent>
                    </Sheet>

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