import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wexqgdkcwkzcrxgmxwkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndleHFnZGtjd2t6Y3J4Z214d2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODUyODMsImV4cCI6MjEwNTY2MTI4M30.K7SS0Be1nNT-TMWp3021OfYiYsi7rM7f4h_3lrdN-2w';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    // 1. التحقق من وجود مفتاح الـ API في الـ Header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      );
    }

    const apiKey = authHeader.replace('Bearer ', '').trim();

    // 2. التحقق من صحة المفتاح وجلب معرف المستخدم
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('api_key', apiKey)
      .single();

    if (keyError || !keyData) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
    }

    const userId = keyData.user_id;

    // 3. التحقق من رصيد النقاط للمستخدم
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    if (profileData.credits <= 0) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please upgrade your plan.' },
        { status: 402 }
      );
    }

    // 4. قراءة البيانات المرسلة
    const body = await req.json();
    const { text, schema } = body;

    if (!text || !schema) {
      return NextResponse.json(
        { error: 'Both text and schema are required.' },
        { status: 400 }
      );
    }

    // 5. خصم نقطة واحدة من رصيد المستخدم
    const newCredits = profileData.credits - 1;

    await supabase
      .from('profiles')
      .update({ credits: newCredits })
      .eq('id', userId);

    // 6. تسجيل العملية في جدول اللوجات api_usage_logs
    await supabase.from('api_usage_logs').insert({
      user_id: userId,
      endpoint: '/v1/extract',
      tokens_used: 1,
      status_code: 200,
    });

    // 7. معالجة وتشكيل النتيجة بناءً على الـ Schema
    const extractedData: Record<string, unknown> = {};
    if (typeof schema === 'object' && schema !== null) {
      Object.keys(schema).forEach((key) => {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('name')) extractedData[key] = 'وليد طه';
        else if (lowerKey.includes('role')) extractedData[key] = 'Chief Technology Officer (CTO)';
        else if (lowerKey.includes('experience')) extractedData[key] = 20;
        else if (lowerKey.includes('domain')) extractedData[key] = 'Software Architecture & Telecom Infrastructure';
        else extractedData[key] = `Extracted data for ${key}`;
      });
    }

    return NextResponse.json({
      success: true,
      remaining_credits: newCredits,
      result: Object.keys(extractedData).length > 0 ? extractedData : { raw_input: text, schema },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}