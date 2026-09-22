'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ApiKeyRecord {
  id?: string;
  developer_name?: string;
  developer_email?: string;
  api_key: string;
  credits: number;
  is_active: boolean;
}

const supabaseUrl = 'https://wexqgdkcwkzcrxgmxwkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndleHFnZGtjd2t6Y3J4Z214d2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODUyODMsImV4cCI6MjEwNTY2MTI4M30.K7SS0Be1nNT-TMWp3021OfYiYsi7rM7f4h_3lrdN-2w';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DeveloperDashboard() {
  const [apiKeyData, setApiKeyData] = useState<ApiKeyRecord | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeveloperData() {
      const { data } = await supabase
        .from('api_keys')
        .select('*')
        .limit(1)
        .single();

      if (data) setApiKeyData(data as ApiKeyRecord);
      setLoading(false);
    }
    fetchDeveloperData();
  }, []);

  const copyToClipboard = () => {
    if (apiKeyData) {
      navigator.clipboard.writeText(apiKeyData.api_key);
      alert('API Key copied to clipboard successfully!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-sans">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans border-t-4 border-blue-500" dir="ltr">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Kian AgentNet Workspace
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Welcome back, <span className="text-white font-bold">{apiKeyData?.developer_name || 'Developer'}</span> ({apiKeyData?.developer_email || ''})
            </p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-3">
            <span className="text-gray-400 text-sm">Account Status:</span> 
            {apiKeyData?.is_active ? (
              <span className="text-green-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Active
              </span>
            ) : (
              <span className="text-red-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span> Suspended
              </span>
            )}
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Credits Card */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Remaining Credits (Tokens)</h3>
            <div className="text-5xl font-bold text-white font-mono">
              {apiKeyData?.credits || 0}
            </div>
            <p className="text-green-400 text-xs mt-3 flex items-center gap-1">
              Sufficient balance for operations
            </p>
          </div>

          {/* Plan Card */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Current Plan</h3>
            <div className="text-2xl font-bold text-white mt-1">Beta Pioneer</div>
            <button className="mt-5 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition w-full shadow">
              Upgrade Plan (Coming Soon)
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-2 h-full bg-gray-600"></div>
            <h3 className="text-gray-400 text-sm font-medium mb-4">Extraction Testing</h3>
            <a href="/" className="text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition w-full border border-gray-600">
              Go to Playground 🚀
            </a>
          </div>
        </div>

        {/* API Key Management */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">Authentication API Key</h2>
          <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between border border-gray-700">
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
              Security Warning: This API key grants direct access to your credits and AI execution engine. Do not share it publicly in frontend codebases or public GitHub repositories.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}