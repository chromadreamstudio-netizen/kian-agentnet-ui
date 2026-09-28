import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('kian-session');
  const { pathname } = req.nextUrl;

  // حماية لوحة التحكم
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  // توجيه المستخدم المسجل بعيداً عن صفحات الدخول والتسجيل
  if (pathname === '/login' || pathname === '/signup') {
    if (isAuthenticated) {
      const dashboardUrl = req.nextUrl.clone();
      dashboardUrl.pathname = '/dashboard';
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};