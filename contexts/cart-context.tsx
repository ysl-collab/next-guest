"use client";

import React from "react";
import { toast } from "sonner";

// Типы для корзины
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    options?: {
        title: string;
        price: number;
    }[];
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: React.ReactNode;
}

// Используем useRef для отслеживания последнего действия
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    
    // Используем useRef для отслеживания последнего действия
    const lastAction = React.useRef<{ type: string; id: string; timestamp: number } | null>(null);

    // Загрузка корзины из localStorage
    React.useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error loading cart:', e);
            }
        }
    }, []);

    // Сохранение корзины в localStorage
    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const showToast = (type: 'success' | 'info', title: string, description: string, id: string) => {
        const now = Date.now();
        const action = lastAction.current;
        
        // Если было такое же действие с тем же id за последние 500мс - не показываем
        if (action && action.type === type && action.id === id && now - action.timestamp < 500) {
            return;
        }
        
        lastAction.current = { type, id, timestamp: now };
        
        if (type === 'success') {
            toast.success(title, { description });
        } else {
            toast.info(title, { description });
        }
    };

    const addItem = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                showToast(
                    'success',
                    'Количество обновлено',
                    `${item.name}: ${existingItem.quantity + 1} шт.`,
                    item.id
                );
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            
            showToast(
                'success',
                'Товар добавлен в корзину',
                item.name,
                item.id
            );
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setCartItems(prev => {
            const item = prev.find(i => i.id === id);
            if (item) {
                showToast(
                    'info',
                    'Товар удален из корзины',
                    item.name,
                    id
                );
            }
            return prev.filter(item => item.id !== id);
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }
        
        setCartItems(prev => {
            const item = prev.find(i => i.id === id);
            if (item && item.quantity !== quantity) {
                showToast(
                    'success',
                    'Количество обновлено',
                    `${item.name}: ${quantity} шт.`,
                    id
                );
            }
            return prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
        });
    };

    const clearCart = () => {
        if (cartItems.length > 0) {
            setCartItems([]);
            showToast(
                'info',
                'Корзина очищена',
                '',
                'clear'
            );
        }
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items: cartItems,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
        }}>
            {children}
        </CartContext.Provider>
    );
};