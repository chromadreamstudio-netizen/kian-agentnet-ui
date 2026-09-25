"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { 
  Terminal, 
  Key, 
  CreditCard, 
  Activity, 
  Copy, 
  Check, 
  BookOpen, 
  Settings, 
  Zap,
  LogOut,
  Loader2
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // حالات البيانات الحقيقية من جدول api_keys
  const [apiKey, setApiKey] = useState("");
  const [credits, setCredits] = useState(100);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function fetchOrInitializeApiKey() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/login';
        return;
      }

      const userId = session.user.id;

      // 1. الاستعلام من جدول api_keys الموجود بالفعل
      let { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      // 2. إذا لم يكن للمستخدم مفتاح، ننشئ له مفتاحاً جديداً بـ 100 كريديت
      if (!data) {
        const randomString = Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        const newApiKey = `sk_kian_${randomString}`;

        const { data: newData, error: insertError } = await supabase
          .from('api_keys')
          .insert([{ 
            user_id: userId, 
            api_key: newApiKey,
            credits: 100,
            is_active: true
          }])
          .select()
          .single();

        if (newData) data = newData;
      }

      // 3. تحديث الواجهة بالبيانات الحقيقية
      if (data) {
        setApiKey(data.api_key);
        setCredits(data.credits ?? 100);
        setIsActive(data.is_active ?? true);
      }
      
      setLoading(false);
    }

    fetchOrInitializeApiKey();
  }, []);

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    document.cookie = "kian-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Kian AgentNet</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Support</button>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">Docs</button>
            <div className="h-4 w-px bg-gray-800"></div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Developer 👋</h1>
          <p className="text-gray-400">Manage your API keys, monitor usage, and test the protocol.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Credits Card */}
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <Activity size={20} />
              <h3 className="font-semibold text-gray-200">API Usage (Credits)</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{credits}</span>
              <span className="text-gray-500 mb-1">/ 100</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2 mt-4 overflow-hidden">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min(100, Math.max(0, (credits / 100) * 100))}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Free Trial Balance</p>
          </div>

          {/* Active Workflows */}
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 text-green-400 mb-4">
              <Terminal size={20} />
              <h3 className="font-semibold text-gray-200">Successful Extractions</h3>
            </div>
            <div className="text-4xl font-bold">0</div>
            <p className="text-xs text-gray-500 mt-5">Ready for first extraction</p>
          </div>

          {/* Billing Plan */}
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full blur-2xl"></div>
            <div className="flex items-center gap-3 text-indigo-400 mb-4">
              <CreditCard size={20} />
              <h3 className="font-semibold text-gray-200">Current Plan</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-1">Hobby (Free Tier)</div>
            <p className="text-sm text-gray-400 mb-4">Upgrade via Lemon Squeezy for higher limits.</p>
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (API Keys) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-yellow-500" />
                  <h2 className="text-lg font-bold text-white">Authentication & API Keys</h2>
                </div>
                <button className="text-sm px-3 py-1.5 border border-gray-700 hover:bg-gray-800 rounded-md transition-colors">
                  Revoke Key
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">
                Use this key to authenticate your requests to the AgentNet Gateway. Keep it secret.
              </p>
              
              <div className="flex items-center gap-3 bg-[#0a0a0a] p-3 rounded-lg border border-gray-800">
                <code className="text-sm text-yellow-500 font-mono flex-1 overflow-hidden text-ellipsis">
                  {apiKey || "Generating Key..."}
                </code>
                <button 
                  onClick={handleCopy}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-gray-300"
                  title="Copy API Key"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Area (Quick Actions) */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h2>
            
            <Link href="/playground" className="flex items-start gap-4 p-4 bg-[#111111] border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-[#151515] transition-all group">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 text-blue-400 transition-colors">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-1">Protocol Playground</h3>
                <p className="text-xs text-gray-400">Test extractions visually without writing any code.</p>
              </div>
            </Link>

            <Link href="#" className="flex items-start gap-4 p-4 bg-[#111111] border border-gray-800 rounded-xl hover:border-indigo-500/50 hover:bg-[#151515] transition-all group opacity-70 cursor-not-allowed">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-1">API Documentation <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full ml-1">Soon</span></h3>
                <p className="text-xs text-gray-400">Learn how to integrate the API into your apps.</p>
              </div>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}