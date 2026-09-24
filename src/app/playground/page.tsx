'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// إعداد الاتصال بقاعدة البيانات (نقطة الالتقاء)
const supabaseUrl = 'https://wexqgdkcwkzcrxgmxwkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndleHFnZGtjd2t6Y3J4Z214d2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODUyODMsImV4cCI6MjEwNTY2MTI4M30.K7SS0Be1nNT-TMWp3021OfYiYsi7rM7f4h_3lrdN-2w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PlaygroundPage() {
  const router = useRouter();
  
  // 1. تغيير حقل النص المباشر إلى حقل رابط (URL) ليتوافق مع نظام Playwright في Render
  const [inputUrl, setInputUrl] = useState('https://ar.wikipedia.org/wiki/تاريخ_مصر');
  // 2. تغيير الهيكل الافتراضي ليكون نص تعليمات كما يطلب نموذج Gemini في الباك إند
  const [schema, setSchema] = useState('Extract core entities, dates, and structured historical events from this page.');
  
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // جلب المفتاح تلقائياً للتسهيل
  useEffect(() => {
    const fetchApiKey = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase.from('api_keys').select('api_key').eq('user_id', user.id).single();
      if (data) {
        setApiKey(data.api_key);
      }
    };
    fetchApiKey();
  }, []);

  const handleExtract = async () => {
    if (!apiKey.trim()) {
      setResult('Error: Please enter your API Key in the authentication field above.');
      return;
    }

    if (!inputUrl.trim()) {
      setResult('Error: Please provide a valid target URL.');
      return;
    }

    setIsLoading(true);
    setResult('Connecting to Kian AgentNet Gateway on Render... ⏳\nExecuting Browser Protocol... (This may take 10-15 seconds)');

    try {
      // 3. الاتصال برابط خادم Render بناءً على المتغير البيئي في Vercel
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kian-agentnet-backend.onrender.com';
      
      const response = await fetch(`${apiUrl}/v1/gateway/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 4. إرسال المفتاح في الهيدر x-api-key كما يتوقع كود Python
          'x-api-key': apiKey.trim() 
        },
        // 5. إرسال البيانات بأسماء المتغيرات (url, target_schema) المطابقة لـ ProtocolRequest
        body: JSON.stringify({ 
          url: inputUrl, 
          target_schema: schema 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // دعم لرسائل الخطأ القادمة من FastAPI
        throw new Error(data.detail || data.message || 'Extraction failed'); 
      }

      setResult(JSON.stringify(data, null, 2));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Protocol Playground 🚀</h1>
            <p className="text-gray-400">Test the AgentNet Web Protocol instantly with your API Key.</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-[#111] hover:bg-[#222] border border-gray-800 text-white px-4 py-2 rounded transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            
            {/* API Key Input */}
            <div className="bg-[#111] border border-blue-900/50 rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              <label className="block text-sm font-medium text-blue-400 mb-2">🔑 Authentication (X-API-Key)</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk_kian_..."
                className="w-full bg-[#0a0a0a] text-gray-200 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">Required to authenticate your request via Supabase database.</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg">
              <label className="block text-sm font-medium text-gray-400 mb-2">1. Target Website URL</label>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-[#0a0a0a] text-gray-200 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500 transition text-left"
                dir="ltr"
                placeholder="https://..."
              />
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg">
              <label className="block text-sm font-medium text-gray-400 mb-2">2. Target Schema (Extraction Instructions)</label>
              <textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className="w-full h-32 bg-[#0a0a0a] text-blue-400 border border-gray-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                spellCheck="false"
              />
            </div>

            <button
              onClick={handleExtract}
              disabled={isLoading}
              className={`w-full font-bold py-3 rounded-lg transition flex justify-center items-center space-x-2 ${
                isLoading ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
              }`}
            >
              <span>{isLoading ? 'Executing Protocol...' : 'Run Extraction ⚡'}</span>
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-400">Structured Output</label>
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">Render Backend Response</span>
            </div>
            <div className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 relative overflow-hidden">
              <pre className={`font-mono text-sm w-full h-full overflow-auto whitespace-pre-wrap ${result.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {result || '// Extracted JSON entities and connection data will appear here...'}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}