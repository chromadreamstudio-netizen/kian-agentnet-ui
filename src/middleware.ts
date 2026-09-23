import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // البحث عن ملف تعريف الارتباط الذي سنقوم بإنشائه عند تسجيل الدخول
  const isAuthenticated = req.cookies.get('kian-session');
  const { pathname } = req.nextUrl;

  // حماية الداشبورد
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  // منع المستخدم المسجل من رؤية صفحات تسجيل الدخول مجدداً
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