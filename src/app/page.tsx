'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setResult(null);

    try {
      // إرسال الطلب الفعلي إلى خادم FastAPI
      const response = await fetch('http://127.0.0.1:8000/v1/gateway/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) {
        throw new Error(`خطأ في الخادم: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({
        status: "error",
        message: "فشل الاتصال بالخادم. تأكد أن خادم Uvicorn يعمل على البورت 8000.",
        details: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Kian AgentNet
          </h1>
          <p className="text-xl text-gray-600">
            Global Agentic Web Protocol
          </p>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            بنية تحتية متطورة لتحويل أي صفحة ويب إلى بيانات مهيكلة جاهزة لعملاء الذكاء الاصطناعي (AI Agents) بخطوة واحدة.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleExecute} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="أدخل رابط الصفحة هنا (مثال: https://example.com)"
            required
            className="flex-1 px-5 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-gray-800 transition-all text-left"
            dir="ltr"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {isLoading ? (
              <span className="animate-pulse">جاري المعالجة...</span>
            ) : (
              <span>استخراج</span>
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-right animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-gray-800 mb-2">نتيجة الاستخراج:</h3>
            <pre className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg overflow-x-auto text-left" dir="ltr">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}