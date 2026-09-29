"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { 
  Key, Copy, Check, Shield, Zap, CreditCard, 
  AlertCircle, Terminal, BookOpen, Webhook, ArrowRight, Code2, Sparkles
} from "lucide-react";

// إعداد اتصال Supabase (تأكد من إضافة هذه المتغيرات في ملف .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DashboardPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    
    try {
      // 1. إنشاء المفتاح
      const generatedKey = "sk_kian_" + Math.random().toString(36).substr(2, 12) + "93f002c67";
      
      // 2. حفظ المفتاح في قاعدة بيانات Supabase
      const { data, error } = await supabase
        .from('api_keys')
        .insert([
          { 
            api_key: generatedKey, 
            is_active: true, 
            credits: 50 
            // ملاحظة: إذا كان عمود user_id إجبارياً في الداتابيز، ستحتاج لتمرير ID المستخدم الحالي هنا
            // user_id: currentUser.id 
          }
        ]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        alert("حدث خطأ أثناء حفظ المفتاح في قاعدة البيانات. تحقق من صلاحيات RLS في Supabase.");
        setIsGenerating(false);
        return;
      }

      // 3. عرض المفتاح في الواجهة بعد نجاح الحفظ
      setApiKey(generatedKey);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, setCopyState: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopyState(true);
    setTimeout(() => setCopyState(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-20">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              Dashboard <span className="text-zinc-500 font-normal">| KIAN AgentNet</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/playground" 
              className="flex itemsمرحباً. استنتاجك صحيح تماماً؛ المشكلة بالفعل تكمن في كود صفحة لوحة التحكم (`page.tsx`)[cite: 3].

بالنظر إلى الكود المرفق في ملف `page.tsx`، وتحديداً داخل دالة `handleGenerateKey`، نجد أن الكود الحالي يقوم فقط بتوليد نص عشوائي داخل المتصفح (باستخدام `Math.random()`) ويقوم بتحديث واجهة المستخدم عبر `setApiKey`، **ولكنه لا يحتوي على أي كود يرسل هذا المفتاح إلى قاعدة بيانات Supabase لحفظه**[cite: 3].

هذا هو السبب الدقيق وراء المشكلتين اللتين تواجههما:
1.  الجدول `public.api_keys` يظهر فارغاً في قاعدة بيانات Supabase لأن المفتاح يُنشأ محلياً في المتصفح فقط ولا يتم عمل `Insert` له في قاعدة البيانات[cite: 2].
2.  بما أن المفتاح غير موجود في قاعدة البيانات، فإن خادم الـ Backend الخاص بك يرفضه ويعيد خطأ `"Invalid or inactive API Key"` عند محاولة استخدامه في صفحة `Protocol Playground`[cite: 1].

**كيفية حل المشكلة:**

يجب عليك تعديل دالة `handleGenerateKey` لتقوم بإدخال (Insert) المفتاح المُولد في جدول `api_keys` في Supabase. لاحظ من صورتك لقاعدة البيانات أن الجدول يتطلب حقولاً مثل `user_id` و `is_active` و `credits`[cite: 2].

إليك مثال يوضح كيف يجب أن تبدو الدالة (بافتراض أنك تستخدم `@supabase/supabase-js` ولديك معلومات المستخدم المسجل):

```javascript
// تأكد من استيراد وتهيئة Supabase client في ملفك
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient('SUPABASE_URL', 'SUPABASE_ANON_KEY');

const handleGenerateKey = async () => {
  setIsGenerating(true);
  
  try {
    // 1. توليد المفتاح
    const generatedKey = "sk_kian_" + Math.random().toString(36).substr(2, 12) + "93f002c67";

    // 2. الحصول على المستخدم الحالي (إذا كنت تستخدم Supabase Auth)
    // const { data: { user } } = await supabase.auth.getUser();
    
    // 3. إرسال المفتاح إلى قاعدة البيانات
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        { 
          api_key: generatedKey,
          // user_id: user.id, // ستحتاج لتمرير مُعرف المستخدم الحقيقي هنا
          is_active: true,
          credits: 50
        }
      ]);

    if (error) {
      console.error("Database error:", error);
      alert("حدث خطأ أثناء حفظ المفتاح في قاعدة البيانات.");
      return;
    }

    // 4. عرض المفتاح في الواجهة بعد التأكد من حفظه بنجاح
    setApiKey(generatedKey);

  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    setIsGenerating(false);
  }
};