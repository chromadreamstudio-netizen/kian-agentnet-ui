import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // جلب ملف تعريف الارتباط (Cookie) الخاص بـ Supabase الذي يحمل بيانات الجلسة
  // يعتمد الاسم على الـ Project ID الخاص بك: wexqgdkcwkzcrxgmxwkj
  const supabaseAuthCookie = req.cookies.get('sb-wexqgdkcwkzcrxgmxwkj-auth-token');

  const { pathname } = req.nextUrl;

  // 1. حماية الداشبورد: إذا لم يكن هناك جلسة نشطة، اذهب لصفحة تسجيل الدخول
  if (pathname.startsWith('/dashboard')) {
    if (!supabaseAuthCookie) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. منع المستخدم المسجل من رؤية صفحات التسجيل والدخول مرة أخرى
  if (pathname === '/login' || pathname === '/signup') {
    if (supabaseAuthCookie) {
      const dashboardUrl = req.nextUrl.clone();
      dashboardUrl.pathname = '/dashboard';
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return res;
}

// تحديد المسارات التي سيعمل عليها هذا الـ Middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};