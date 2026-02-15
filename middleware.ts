// middleware.ts (в корне проекта)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Проверяем, что запрос идет к нашему домену
  const url = request.nextUrl.clone()
  
  const response = NextResponse.next()
  
  // Важно! Разрешаем фреймы только от Telegram OAuth
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors http://127.0.0.1:3000 https://oauth.telegram.org;"
  )
  
  return response
}

export const config = {
  matcher: '/:path*',
}