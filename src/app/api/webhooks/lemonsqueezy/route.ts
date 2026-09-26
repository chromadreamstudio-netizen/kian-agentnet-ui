import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// نستخدم Service Role لتخطي قواعد الحماية (RLS) وتحديث الرصيد مباشرة من الباك إند
const supabase = createClient(supabaseUrl, supabaseServiceRole);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

    // التحقق من أمان الطلب (أنه قادم فعلاً من Lemon Squeezy)
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;

    // إذا تمت عملية الدفع بنجاح
    if (eventName === 'order_created') {
      const customData = payload.meta.custom_data;
      const userId = customData?.user_id;

      if (userId) {
        // جلب الرصيد الحالي للمستخدم
        const { data: keyData } = await supabase
          .from('api_keys')
          .select('credits')
          .eq('user_id', userId)
          .single();

        if (keyData) {
          // إضافة 50,000 كريديت للرصيد الحالي
          const newCredits = (keyData.credits || 0) + 50000;
          
          await supabase
            .from('api_keys')
            .update({ credits: newCredits })
            .eq('user_id', userId);
        }
      }
    }

    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}