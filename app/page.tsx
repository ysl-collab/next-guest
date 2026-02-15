"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Card, Item, ItemActions, ItemContent, ItemMedia, ItemTitle, Skeleton } from "@/components/ui/index";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/ui";
import { toast } from "sonner";
import { BadgeCheckIcon, ChevronRightIcon, Leaf, MinusIcon, PlusIcon, ShoppingBag, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";

// Массив с данными о блюдах и изображениями с Freepik
const menuItems = [
    {
        id: "2",
        name: "Ризотто с грибами",
        description: "Кремовое ризотто с белыми грибами и трюфельным маслом",
        price: 950,
        image: "https://img.freepik.com/free-photo/risotto-with-mushrooms-and-parmesan_2829-19768.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123457",
        category: "Ризотто",
        isFeatured: false,
        ingredients: ["Рис арборио", "Белые грибы", "Пармезан", "Трюфельное масло", "Лук"]
    },
    {
        id: "3",
        name: "Цезарь с курицей",
        description: "Салат с куриным филе, пармезаном, сухариками и соусом цезарь",
        price: 650,
        image: "https://img.freepik.com/free-photo/caesar-salad-with-grilled-chicken-breast_2829-19980.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123458",
        category: "Салаты",
        isFeatured: true,
        ingredients: ["Куриное филе", "Салат романо", "Пармезан", "Сухарики", "Соус цезарь"]
    },
    {
        id: "4",
        name: "Говяжий стейк",
        description: "Сочный стейк из мраморной говядины с розмарином и чесноком",
        price: 2450,
        image: "https://img.freepik.com/free-photo/juicy-steak-with-herbs-and-garlic_2829-19876.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123459",
        category: "Мясо",
        isFeatured: false,
        ingredients: ["Мраморная говядина", "Розмарин", "Чеснок", "Сливочное масло"]
    },
    {
        id: "5",
        name: "Тирамису",
        description: "Классический итальянский десерт с маскарпоне и какао",
        price: 550,
        image: "https://img.freepik.com/free-photo/delicious-tiramisu-dessert_23-2150690561.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123460",
        category: "Десерты",
        isFeatured: true,
        ingredients: ["Маскарпоне", "Савоярди", "Кофе", "Какао", "Яйца"]
    },
    {
        id: "6",
        name: "Том Ям с креветками",
        description: "Острый тайский суп с креветками и кокосовым молоком",
        price: 890,
        image: "https://img.freepik.com/free-photo/spicy-thai-soup-with-shrimp-and-mushrooms_2829-19981.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123461",
        category: "Супы",
        isFeatured: false,
        ingredients: ["Креветки", "Кокосовое молоко", "Грибы", "Лемонграсс", "Чили"]
    },
    {
        id: "7",
        name: "Брускетта с томатами",
        description: "Хрустящий хлеб с томатами, базиликом и оливковым маслом",
        price: 390,
        image: "https://img.freepik.com/free-photo/bruschetta-with-tomatoes-and-basil_2829-19982.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123462",
        category: "Закуски",
        isFeatured: false,
        ingredients: ["Чиабатта", "Томаты", "Базилик", "Оливковое масло", "Чеснок"]
    },
    {
        id: "8",
        name: "Лосось с овощами",
        description: "Запеченный лосось с сезонными овощами и лимонным соусом",
        price: 1650,
        image: "https://img.freepik.com/free-photo/grilled-salmon-with-vegetables_2829-19983.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123463",
        category: "Рыба",
        isFeatured: true,
        ingredients: ["Филе лосося", "Спаржа", "Черри", "Лимон", "Пряные травы"]
    },
    {
        id: "9",
        name: "Тыквенный суп",
        description: "Нежный крем-суп из тыквы с имбирем и сливками",
        price: 450,
        image: "https://img.freepik.com/free-photo/creamy-pumpkin-soup_2829-19984.jpg?w=740&t=st=1709123456~exp=1709124056~hmac=123464",
        category: "Супы",
        isFeatured: false,
        ingredients: ["Тыква", "Имбирь", "Сливки", "Тыквенные семечки", "Пряности"]
    }
];

// Компонент счетчика
interface CounterProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

function Counter({ quantity, onIncrement, onDecrement }: CounterProps) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onDecrement}
                disabled={quantity === 0}
            >
                <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={onIncrement}
            >
                <PlusIcon className="h-4 w-4" />
            </Button>
        </div>
    );
}

// Компонент карточки с данными
interface MenuCardProps {
    item: typeof menuItems[0];
    quantity: number;
    onAddToCart: () => void;
    onUpdateQuantity: (newQuantity: number) => void;
}

function MenuCard({ item, quantity, onAddToCart, onUpdateQuantity }: MenuCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden group flex flex-col h-full">
            <div className="absolute inset-0 z-30 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-20 aspect-video w-full overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                    loading="lazy"
                />
            </div>
            <CardHeader className="flex-1">
                <CardAction>
                    {item.isFeatured && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            Популярное
                        </Badge>
                    )}
                    <Badge variant="outline">{item.category}</Badge>
                </CardAction>
                <CardTitle className="line-clamp-1">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>

                {/* Ингредиенты */}
                <div className="mt-2 flex flex-wrap gap-1">
                    {item.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            {ingredient}
                        </span>
                    ))}
                    {item.ingredients.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                            +{item.ingredients.length - 3}
                        </span>
                    )}
                </div>

                <div className="mt-2 text-lg font-bold text-primary">
                    {item.price} ₽
                </div>
            </CardHeader>
            <CardFooter className="pt-0">
                {quantity > 0 ? (
                    <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            В корзине: {quantity}
                        </span>
                        <Counter
                            quantity={quantity}
                            onIncrement={() => onUpdateQuantity(quantity + 1)}
                            onDecrement={() => onUpdateQuantity(quantity - 1)}
                        />
                    </div>
                ) : (
                    <Button
                        className="w-full gap-2"
                        variant="default"
                        onClick={onAddToCart}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Добавить в корзину
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

// Компонент скелетона
function SkeletonCard() {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
                <CardAction>
                    <Skeleton className="h-5 w-20" />
                </CardAction>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
                <div className="mt-2">
                    <Skeleton className="h-6 w-24" />
                </div>
            </CardHeader>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
}

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("Все");
    const { addItem, updateQuantity, items } = useCart();

    // Имитация загрузки данных
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Получаем количества из корзины
    const getItemQuantity = (itemId: string) => {
        const cartItem = items.find(item => item.id === itemId);
        return cartItem?.quantity || 0;
    };

    const handleAddToCart = (item: typeof menuItems[0]) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            options: item.ingredients.map(ing => ({ title: ing, price: 0 }))
        });
    };

    const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            updateQuantity(itemId, 0);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    // Фильтрация блюд по категории
    const filteredItems = selectedCategory === "Все"
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    // Группировка по категориям с подсчетом количества
    const categories = ["Все", ...new Set(menuItems.map(item => item.category))];
    const categoryCounts = categories.reduce((acc, category) => {
        if (category === "Все") {
            acc[category] = menuItems.length;
        } else {
            acc[category] = menuItems.filter(item => item.category === category).length;
        }
        return acc;
    }, {} as Record<string, number>);

    // Создаем массив для отображения
    const skeletonCards = Array(6).fill(null).map((_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
    ));

    const dataCards = filteredItems.map((item) => (
        <MenuCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(item.id)}
            onAddToCart={() => handleAddToCart(item)}
            onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.id, newQuantity)}
        />
    ));

    // Комбинируем скелетоны и карточки с данными
    const displayCards = isLoading
        ? skeletonCards
        : dataCards.length > 0
            ? dataCards
            : (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">В этой категории пока нет блюд</p>
                </div>
            );

    return (
        <Container className="flex flex-col items-start justify-center gap-6 py-10">
            {/* Баннер с информацией */}
            <Item variant="outline" size="sm" asChild className="w-full hover:bg-muted/50 transition-colors">
                <a href="/knowledge">
                    <ItemMedia className="text-green-500">
                        <Leaf className="size-5" />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Только натуральные ингредиенты от местных производителей</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <ChevronRightIcon className="size-4" />
                    </ItemActions>
                </a>
            </Item>

            {/* Заголовок и кнопка обновления */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between gap-4">
                <div>
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">Наше меню</h1>
                    <p className="text-muted-foreground mt-1">
                        {filteredItems.length} {getWordForm(filteredItems.length, ['блюдо', 'блюда', 'блюд'])}
                        {selectedCategory !== "Все" && ` в категории "${selectedCategory}"`}
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() =>
                        toast.success("Меню обновлено", {
                            description: "Доступны новые блюда",
                            position: "bottom-center",
                        })
                    }
                >
                    Обновить меню
                </Button>
            </div>

            {/* Фильтр по категориям */}
            <div className="flex flex-wrap items-center gap-2 w-full">
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "secondary" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                        <span className="ml-1 text-xs opacity-70">
                            ({categoryCounts[category]})
                        </span>
                    </Button>
                ))}

                {/* Отдельная кнопка для сброса фильтра, если выбрана не "Все" */}
                {selectedCategory !== "Все" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full text-muted-foreground hover:text-foreground"
                        onClick={() => setSelectedCategory("Все")}
                    >
                        <X className="h-3 w-3 mr-1" />
                        Сбросить
                    </Button>
                )}
            </div>

            {/* Сетка с блюдами */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {displayCards}
            </div>

            {/* Информация о ресторане */}
            <div className="mt-8 w-full p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border">
                <div className="flex items-start gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <BadgeCheckIcon className="h-5 w-5 text-primary" />
                            О ресторане "В ГОСТИ"
                        </h3>
                        <p className="text-muted-foreground">
                            Наш ресторан предлагает блюда из свежайших продуктов, приготовленные с любовью и вниманием к деталям.
                            Мы сотрудничаем только с проверенными фермерскими хозяйствами и используем сезонные ингредиенты.
                            Каждое блюдо готовится индивидуально для вас, чтобы вы могли насладиться неповторимым вкусом и ароматом.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="px-3 py-1">
                            Ежедневно 12:00 - 23:00
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-1">
                            Бесплатная доставка от 1500 ₽
                        </Badge>
                    </div>
                </div>
            </div>
        </Container>
    );
}

// Вспомогательная функция для склонения слов
function getWordForm(number: number, forms: [string, string, string]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
        number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
    ];
}