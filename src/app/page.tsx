'use client';

import { useState } from 'react';

interface ExecutionResult {
  status?: string;
  message?: string;
  details?: string;
  protocol_version?: string;
  remaining_credits?: number;
  data?: Record<string, unknown>;
  error?: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('kian_live_secret_12345');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  // استخدام رابط الـ API السحابي المرفوع، أو العودة للمحلي فقط عند التطوير
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !apiKey) return;
    
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/gateway/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ url }),
      });

      const data: ExecutionResult = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `خطأ في الخادم: ${response.status}`);
      }

      setResult(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
      setResult({
        status: "error",
        message: "فشل تنفيذ الطلب عبر السيرفر أونلاين.",
        details: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Kian AgentNet
          </h1>
          <p className="text-xl text-gray-600">
            Global Agentic Web Protocol (Secured & Tokenized)
          </p>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            بنية تحتية متطورة لتحويل أي صفحة ويب إلى بيانات مهيكلة لعملاء الذكاء الاصطناعي مع نظام محاسبة الـ Tokens.
          </p>
        </div>

        <form onSubmit={handleExecute} className="mt-8 flex flex-col gap-3 max-w-2xl mx-auto">
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="أدخل مفتاح API الخاص بك (X-API-Key)"
            required
            className="px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 outline-none text-gray-800 text-sm font-mono text-left"
            dir="ltr"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="أدخل رابط الصفحة (مثال: https://example.com)"
              required
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 outline-none text-gray-800 text-left"
              dir="ltr"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center min-w-[140px]"
            >
              {isLoading ? (
                <span className="animate-pulse">جاري المعالجة...</span>
              ) : (
                <span>استخراج</span>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-right animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-gray-800 mb-2">نتيجة الاستخراج والتحقق:</h3>
            <pre className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto text-left" dir="ltr">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}