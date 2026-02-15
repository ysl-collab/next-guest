// app/api/auth/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    const { hash, ...data } = userData;

    console.log('Received auth data:', { ...data, hash: hash?.substring(0, 10) + '...' });

    // Проверяем наличие hash
    if (!hash) {
      return NextResponse.json({ error: 'No hash provided' }, { status: 400 });
    }

    // Проверяем актуальность данных (не старше 24 часов)
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - data.auth_date > 86400) {
      return NextResponse.json({ error: 'Data expired' }, { status: 401 });
    }

    // Создаем строку для проверки (поля должны быть отсортированы!)
    const dataCheckString = Object.keys(data)
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('\n');

    console.log('Data check string:', dataCheckString);

    // Получаем токен бота из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Создаем секретный ключ
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Вычисляем хеш
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    console.log('Hash comparison:', {
      calculated: calculatedHash.substring(0, 10) + '...',
      received: hash.substring(0, 10) + '...'
    });

    // Сравниваем хеши
    if (calculatedHash === hash) {
      // Успешная авторизация
      console.log('✅ Auth successful for user:', data.id);
      
      // Создаем ответ с куки
      const response = NextResponse.json({ 
        success: true, 
        user: {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          photo_url: data.photo_url
        }
      });
      
      // Устанавливаем сессионную куку
      response.cookies.set('telegram_user', JSON.stringify({
        id: data.id,
        name: data.first_name
      }), {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        path: '/'
      });
      
      return response;
    } else {
      console.error('❌ Invalid hash');
      return NextResponse.json({ error: 'Invalid hash' }, { status: 403 });
    }
  } catch (error) {
    console.error('❌ Auth error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}