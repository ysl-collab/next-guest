"use client"; // 👈 Обязательно для Next.js App Router

import { TelegramLoginButton, TelegramLoginWidgetData } from '@advanceddev/telegram-login-react';

function TelegramAuth() {
  const handleAuth = async (userData: TelegramLoginWidgetData) => {
    console.log("Данные от Telegram:", userData);
    
    // ⚠️ НИКОГДА не проверяйте hash на клиенте!
    // Отправляем данные на свой сервер для валидации
    try {
      const response = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const result = await response.json();
      if (result.success) {
        // Перенаправляем пользователя или обновляем состояние
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <TelegramLoginButton
      botUsername="vgosti_rest_bot" // Имя бота БЕЗ @
      onAuthCallback={handleAuth}
      size="large" // Доступны размеры: 'large' | 'medium' | 'small'
      lang="ru"    // Язык кнопки
      userPic={true} // Показывать аватар пользователя после авторизации
      radius={10}    // Скругление углов
    />
  );
}

export { TelegramAuth }