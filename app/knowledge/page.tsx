import { Title } from "@/components/ui"
import { Leaf, Sparkles, Heart, Shield, Clock, Award, ChefHat, Wheat, Flame, Droplet } from "lucide-react"
import { Item, ItemContent, ItemMedia, ItemTitle, ItemActions } from "@/components/ui/item"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Knowledge() {
    const ingredients = [
        {
            icon: <Leaf className="size-5 text-green-500" />,
            title: "Органические овощи",
            description: "Все овощи выращены без пестицидов и химических удобрений на местных фермах",
            badge: "Эко"
        },
        {
            icon: <Flame className="size-5 text-orange-500" />,
            title: "Натуральные специи",
            description: "Используем только цельные специи, свежемолотые перед приготовлением",
            badge: "Ароматно"
        },
        {
            icon: <Droplet className="size-5 text-blue-500" />,
            title: "Родниковая вода",
            description: "Вся вода проходит многоступенчатую очистку и обогащение минералами",
            badge: "Чистота"
        },
        {
            icon: <Heart className="size-5 text-red-500" />,
            title: "Без консервантов",
            description: "Никаких искусственных добавок, усилителей вкуса и ГМО",
            badge: "Натурально"
        },
        {
            icon: <ChefHat className="size-5 text-purple-500" />,
            title: "Авторские рецепты",
            description: "Уникальные сочетания ингредиентов, разработанные нашим шеф-поваром",
            badge: "Эксклюзив"
        },
        {
            icon: <Wheat className="size-5 text-amber-500" />,
            title: "Безглютеновые опции",
            description: "Специальное меню для людей с непереносимостью глютена",
            badge: "Здоровье"
        }
    ]

    const facts = [
        {
            icon: <Clock className="size-8 text-primary" />,
            value: "24 часа",
            label: "Максимальная свежесть",
            description: "Все ингредиенты поступают ежедневно"
        },
        {
            icon: <Award className="size-8 text-primary" />,
            value: "100%",
            label: "Натуральность",
            description: "Никаких искусственных добавок"
        },
        {
            icon: <Shield className="size-8 text-primary" />,
            value: "5 этапов",
            label: "Контроля качества",
            description: "От поля до вашего стола"
        },
        {
            icon: <Sparkles className="size-8 text-primary" />,
            value: "15+",
            label: "Авторских рецептов",
            description: "Уникальные сочетания вкусов"
        }
    ]

    return (
        <div className="py-10 space-y-12">
            {/* Заголовок с анимацией */}
            <div className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                    <Leaf className="size-16 text-green-500 relative animate-pulse" />
                </div>
                <div className="space-y-2">
                    <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">
                        Натуральные продукты
                    </Badge>
                    <Title className="text-3xl md:text-4xl font-bold">
                        Только натуральные ингредиенты
                    </Title>
                    <p className="text-muted-foreground max-w-2xl">
                        Мы используем только натуральные ингредиенты в наших блюдах, 
                        чтобы Ваше здоровье было крепким, а вкус - незабываемым ❤️
                    </p>
                </div>
            </div>

            {/* Статистика в карточках */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {facts.map((fact, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                            <div className="flex justify-center mb-2">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    {fact.icon}
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">{fact.value}</CardTitle>
                            <CardDescription className="font-medium">{fact.label}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{fact.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Сетка с ингредиентами */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Наши ингредиенты</h2>
                    <Badge variant="secondary" className="px-3 py-1">
                        {ingredients.length} позиций
                    </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ingredients.map((item, index) => (
                        <Item 
                            key={index} 
                            variant="outline" 
                            size="lg" 
                            asChild
                            className="group hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        >
                            <div className="p-4 flex items-center gap-4">
                                <ItemMedia className="text-green-500 group-hover:scale-110 transition-transform duration-300">
                                    <div className="p-2 bg-green-500/10 rounded-lg">
                                        {item.icon}
                                    </div>
                                </ItemMedia>
                                <ItemContent>
                                    <div className="flex items-center gap-2">
                                        <ItemTitle className="text-base font-semibold">
                                            {item.title}
                                        </ItemTitle>
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                            {item.badge}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {item.description}
                                    </p>
                                </ItemContent>
                                <ItemActions className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                                </ItemActions>
                            </div>
                        </Item>
                    ))}
                </div>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/5 to-transparent rounded-lg border">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <Shield className="size-5 text-green-500" />
                            Гарантия качества
                        </h3>
                        <p className="text-muted-foreground">
                            Мы лично проверяем каждый ингредиент перед тем, как он попадет в ваше блюдо. 
                            Наши поставщики - только проверенные фермерские хозяйства с многолетней репутацией.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="px-3 py-1">
                            Сертифицировано
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-1">
                            Без ГМО
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}