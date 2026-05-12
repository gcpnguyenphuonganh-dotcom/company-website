// proxy.ts (đổi tên từ middleware.ts)
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'vi', 'ja']
const defaultLocale = 'en'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) return

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}