'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// استخدم مفتاح ANON KEY الخاص بـ Supabase هنا
const supabaseUrl = 'https://wexqgdkcwkzcrxgmxwkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndleHFnZGtjd2t6Y3J4Z214d2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODUyODMsImV4cCI6MjEwNTY2MTI4M30.K7SS0Be1nNT-TMWp3021OfYiYsi7rM7f4h_3lrdN-2w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DeveloperDashboard() {
  const [apiKeyData, setApiKeyData] = useState<any>(null);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeveloperData() {
      // نجلب بيانات المطور بناءً على ما رأيناه في قاعدة البيانات
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .limit(1)
        .single();

      if (data) setApiKeyData(data);
      setLoading(false);
    }
    fetchDeveloperData();
  }, []);

  const copyToClipboard = () => {
    if(apiKeyData) {
      navigator.clipboard.writeText(apiKeyData.api_key);
      alert('تم نسخ مفتاح الـ API بنجاح!');
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-sans">جاري تحميل مساحة العمل...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans border-t-4 border-blue-500" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-blue-400 to-indigo-500">
              Kian AgentNet Workspace
            </h1>
            <p className="text-gray-400 mt-2 text-sm">مرحباً بك يا <span className="text-white font-bold">{apiKeyData?.developer_name || 'مطور'}</span> ({apiKeyData?.developer_email})</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-3">
            <span className="text-gray-400 text-sm">حالة الحساب:</span> 
            {apiKeyData?.is_active ? (
                <span className="text-green-400 font-semibold flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span> نشط
                </span>
            ) : (
                <span className="text-red-400 font-semibold flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span> موقوف
                </span>
            )}
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Credits Card */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">الرصيد المتبقي (Tokens)</h3>
            <div className="text-5xl font-bold text-white font-mono">
              {apiKeyData?.credits || 0}
            </div>
            <p className="text-green-400 text-xs mt-3 flex items-center gap-1">
               رصيد كافٍ للعمليات التشغيلية
            </p>
          </div>

          {/* Plan Card */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">الباقة الحالية</h3>
            <div className="text-2xl font-bold text-white mt-1">Beta Pioneer</div>
            <button className="mt-5 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition w-full shadow">
              ترقية الباقة (قريباً)
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-2 h-full bg-gray-600"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-4">اختبار الاستخراج</h3>
            <a href="/" className="text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition w-full border border-gray-600">
               الانتقال لواجهة التجربة 🚀
            </a>
          </div>
        </div>

        {/* API Key Management */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">مفتاح المصادقة (API Key)</h2>
          <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between border border-gray-700" dir="ltr">
            <code className="text-blue-400 font-mono tracking-wider text-sm md:text-base">
              {showKey ? apiKeyData?.api_key : '••••••••••••••••••••••••••••••••••••••••••••••'}
            </code>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowKey(!showKey)}
                className="text-gray-400 hover:text-white transition text-sm font-medium"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
              <button 
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-md text-sm transition shadow-sm font-medium"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded text-red-300 text-xs flex items-start gap-2">
            <span>⚠️</span>
            <p>
              تحذير أمني: هذا المفتاح يمنح الوصول المباشر لرصيدك ولمحرك الذكاء الاصطناعي. لا تقم بمشاركته علناً في الواجهات الأمامية أو مستودعات Github.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}