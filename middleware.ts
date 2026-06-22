import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_LANG = 'en';
const LANGS = ['vi', 'en', 'ja'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.get('isAuth')?.value === 'true';
  const isLoginPage = pathname === '/login' || pathname.startsWith('/login/');

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const pathnameHasLang = LANGS.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (isAuthenticated && !pathnameHasLang && !isLoginPage) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LANG}${pathname}`, request.url));
  }

  return NextResponse.next();
}