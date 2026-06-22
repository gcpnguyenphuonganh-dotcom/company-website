import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_LOCALE = 'en';
const LOCALES = ['vi', 'en', 'ja'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.get('isAuth')?.value === 'true';
  const isLoginPage = pathname === '/login' || pathname.startsWith('/login/');

  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};