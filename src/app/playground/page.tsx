'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// تهيئة Supabase للتحقق من الجلسة
const supabaseUrl = 'https://wexqgdkcwkzcrxgmxwkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndleHFnZGtjd2t6Y3J4Z214d2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODUyODMsImV4cCI6MjEwNTY2MTI4M30.K7SS0Be1nNT-TMWp3021OfYiYsi7rM7f4h_3lrdN-2w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PlaygroundPage() {
  const router = useRouter();
  const [inputText, setInputText] = useState('وليد طه، مدير تقني بخبرة 20 عاماً في هندسة البرمجيات والبنية التحتية للمؤسسات.');
  const [schema, setSchema] = useState('{\n  "name": "string",\n  "role": "string",\n  "experience_years": "number",\n  "domain": "string"\n}');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // جلب مفتاح API الخاص بالمستخدم لاستخدامه في الطلب
  useEffect(() => {
    const fetchApiKey = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { data } = await supabase.from('api_keys').select('api_key').eq('user_id', user.id).single();
      if (data) setApiKey(data.api_key);
    };
    fetchApiKey();
  }, [router]);

  const handleExtract = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setResult('Processing extraction...');

    try {
      // سنقوم بتوجيه الطلب إلى نقطة النهاية التي سنبنيها في المرحلة الخامسة
      const response = await fetch('/api/v1/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          text: inputText, 
          schema: JSON.parse(schema) 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Extraction failed');
      }

      setResult(JSON.stringify(data.result, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}\n\nملاحظة: هذا الخطأ طبيعي لأننا لم نقم ببرمجة الـ API Backend (المرحلة الخامسة) بعد.`);
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
            <h1 className="text-3xl font-bold text-white mb-2">Extraction Playground 🚀</h1>
            <p className="text-gray-400">Test the AI engine instantly. Provide unstructured text and a JSON schema.</p>
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
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg">
              <label className="block text-sm font-medium text-gray-400 mb-2">1. Unstructured Text Input</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 bg-[#0a0a0a] text-gray-200 border border-gray-700 rounded-lg p-4 focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder="Paste your raw text, emails, or logs here..."
              />
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg">
              <label className="block text-sm font-medium text-gray-400 mb-2">2. Desired JSON Schema</label>
              <textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className="w-full h-48 bg-[#0a0a0a] text-blue-400 border border-gray-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-blue-500 transition resize-none"
                spellCheck="false"
              />
            </div>

            <button
              onClick={handleExtract}
              disabled={isLoading || !apiKey}
              className={`w-full font-bold py-3 rounded-lg transition flex justify-center items-center space-x-2 ${
                isLoading ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <span>{isLoading ? 'Extracting Data...' : 'Run Extraction'}</span>
              {!isLoading && <span>⚡</span>}
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-400">Structured Output (JSON)</label>
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">Live Response</span>
            </div>
            <div className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-lg p-4 relative overflow-hidden">
              <pre className={`font-mono text-sm w-full h-full overflow-auto whitespace-pre-wrap ${result.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {result || '// Your extracted data will appear here...'}
              </pre>
              {isLoading && (
                <div className="absolute inset-0 bg-[#0a0a0a]/80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}