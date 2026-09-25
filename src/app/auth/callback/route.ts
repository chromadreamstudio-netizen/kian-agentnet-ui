import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // تأكد من استدعاء نسخة السيرفر

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // توجيه المستخدم إلى لوحة التحكم بعد تسجيل الدخول
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // في حال فشل المصادقة، إرجاع المستخدم لصفحة تسجيل الدخول مع رسالة خطأ
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}