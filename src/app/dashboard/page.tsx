'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabaseUrl = 'https://wexqgdkcwkzcrxgmxwkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndleHFnZGtjd2t6Y3J4Z214d2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODUyODMsImV4cCI6MjEwNTY2MTI4M30.K7SS0Be1nNT-TMWp3021OfYiYsi7rM7f4h_3lrdN-2w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>('Loading...');
  const [credits, setCredits] = useState<number | string>('...');
  const [plan, setPlan] = useState<string>('Loading...');
  const [apiKey, setApiKey] = useState<string>('Loading...');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        router.push('/login');
        return;
      }
      
      setUserEmail(user.email ?? 'User');

      const { data: profileData } = await supabase
        .from('profiles')
        .select('credits, plan')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setCredits(profileData.credits);
        setPlan(profileData.plan);
      } else {
        setCredits(0);
        setPlan('No Plan Found');
      }

      const { data: keyData } = await supabase
        .from('api_keys')
        .select('api_key')
        .eq('user_id', user.id)
        .single();

      if (keyData) {
        setApiKey(keyData.api_key);
      } else {
        setApiKey('No API Key found. Please create a new account to trigger generation.');
      }
    };

    fetchUserData();
  }, [router]);

  const copyToClipboard = () => {
    if (apiKey && !apiKey.includes('found')) {
      navigator.clipboard.writeText(apiKey);
      alert('API Key copied to clipboard!');
    }
  };

  // دالة تسجيل الخروج الجديدة
  const handleLogout = async () => {
    // 1. تسجيل الخروج من Supabase
    await supabase.auth.signOut();
    
    // 2. مسح تصريح الـ Middleware
    document.cookie = "kian-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // 3. العودة للصفحة الرئيسية
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Kian AgentNet Workspace</h1>
            <p className="text-gray-400">
              Welcome back, <span className="text-blue-400 font-medium">{userEmail}</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-[#111] border border-gray-800 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-300">Account Status: <span className="text-green-400">Active</span></span>
            </div>
            
            {/* زر تسجيل الخروج الجديد */}
            <button 
              onClick={handleLogout}
              className="text-sm bg-[#1a1a1a] hover:bg-red-900/30 text-gray-400 hover:text-red-400 border border-gray-800 hover:border-red-900/50 px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credits Card */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-l-blue-500">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Remaining Credits (Tokens)</h3>
            <div className="text-4xl font-black text-white mb-2">{credits}</div>
            <p className="text-xs text-green-400">
              {typeof credits === 'number' && credits > 0 ? 'Sufficient balance for operations' : 'Balance empty or loading'}
            </p>
          </div>

          {/* Plan Card */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-l-purple-500">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Current Plan</h3>
            <div className="text-2xl font-bold text-white mb-4">{plan}</div>
            <button className="w-full bg-blue-600/20 text-blue-400 border border-blue-600/50 hover:bg-blue-600/30 font-medium py-2 rounded transition text-sm">
              Upgrade Plan (Coming Soon)
            </button>
          </div>

          {/* Action Card */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between border-l-4 border-l-gray-600">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Extraction Testing</h3>
            <button className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 text-white font-medium py-3 rounded transition flex items-center justify-center space-x-2">
              <span>Go to Playground</span>
              <span>🚀</span>
            </button>
          </div>
        </div>

        {/* API Key Section */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">Authentication API Key</h3>
          <div className="flex items-center space-x-4 bg-[#0a0a0a] border border-gray-800 p-4 rounded-lg">
            <code className="text-blue-400 flex-1 overflow-x-auto font-mono">
              {showKey ? apiKey : 'sk_kian_***********************************'}
            </code>
            <button 
              onClick={() => setShowKey(!showKey)}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
            <button 
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm transition"
            >
              Copy
            </button>
          </div>
          <p className="mt-4 text-xs text-amber-500/80 bg-amber-500/10 border border-amber-500/20 p-3 rounded">
            ⚠️ Security Warning: This API key grants direct access to your credits and AI execution engine. Do not share it publicly.
          </p>
        </div>

      </div>
    </div>
  );
}