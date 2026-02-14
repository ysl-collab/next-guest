import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    className?: string;
}

const cats = ['Новинки', 'Завтрак', 'Кофе', 'Обед', 'Чай', 'Ужин', 'Десерты', 'Напитки', 'Выпечка', 'Здоровое питание', 'Постное меню', 'Вегетарианское меню', 'Морепродукты', 'Мясные блюда', 'Птица', 'Гарниры', 'Супы', 'Салаты'];
const activeCat = 'Новинки';

// export const Categories: React.FC<Props> = ({ className }) => {
//     return (
//         <div className={cn("flex items-center gap-4 overflow-x-auto py-4", className)}>
//             {cats.map((cat, index) => (
//                 <a className={cn("flex items-center gap-2", cat === activeCat ? "pointer-events-none" : "")} href="#" key={index}>
//                     <button className={cat === activeCat ? "bg-red-500 text-white" : "bg-gray-100"}>{cat}</button>
//                 </a>
//             ))}
//         </div>
// )}