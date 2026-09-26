import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  // ضبط الـ Cookie وتوجيه المستخدم للداشبورد فوراً بعد نجاح مصادقة جوجل
  const response = NextResponse.redirect(`${origin}/dashboard`);
  response.cookies.set('kian-session', 'true', { path: '/', maxAge: 86400 });
  return response;
}