import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// نستخدم Service Role Key لتخطي الـ RLS في الباك إند والقدرة على قراءة المفاتيح والخصم
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  try {
    // 1. استلام الطلب واستخراج مفتاح الـ API من الهيدر
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid or missing API Key' }, { status: 401 });
    }

    const apiKey = authHeader.split(' ')[1];
    const body = await req.json();

    // 2. التحقق من وجود المفتاح في قاعدة البيانات
    const { data: keyData, error: keyError } = await supabaseAdmin
      .from('api_keys')
      .select('user_id, id')
      .eq('api_key', apiKey)
      .single();

    if (keyError || !keyData) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
    }

    // 3. التحقق من رصيد المستخدم
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('credits')
      .eq('id', keyData.user_id)
      .single();

    if (profileError || !profile || profile.credits <= 0) {
      return NextResponse.json({ error: 'Insufficient credits. Please upgrade your plan.' }, { status: 402 });
    }

    // 4. خصم نقطة واحدة من الرصيد
    await supabaseAdmin
      .from('profiles')
      .update({ credits: profile.credits - 1 })
      .eq('id', keyData.user_id);

    // 5. تسجيل عملية الاستخدام في الـ Logs
    await supabaseAdmin
      .from('api_usage_logs')
      .insert({
        api_key_id: keyData.id,
        status: 'success',
        execution_time_ms: 350 // رقم افتراضي لسرعة الاستجابة حالياً
      });

    // 6. محاكاة الرد من الذكاء الاصطناعي بناءً على النص والـ Schema التي أدخلتها
    // (لاحقاً سنربط هذا الجزء بمحرك OpenAI أو Gemini الحقيقي)
    return NextResponse.json({
      name: "وليد طه",
      role: "مدير تقني",
      experience_years: 20,
      domain: "هندسة البرمجيات والبنية التحتية للمؤسسات"
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}