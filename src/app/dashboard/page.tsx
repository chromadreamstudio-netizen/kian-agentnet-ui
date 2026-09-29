"use "use client";

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
  LogOut,
  Loader2,
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [apiKey, setApiKey] = useState("");
  const [credits, setCredits] = useState(50);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchOrInitializeApiKey() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/login';
        return;
      }

      const currentUserId = session.user.id;
      setUserId(currentUserId);

      let { data } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', currentUserId)
        .maybeSingle();

      if (!data) {
        const randomString = Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        const newApiKey = `sk_kian_${randomString}`;

        const { data: newData } = await supabase
          .from('api_keys')
          .insert([{ 
            user_id: currentUserId, 
            api_key: newApiKey,
            credits: 50,
            is_active: true
          }])
          .select()
          .single();

        if (newData) data = newData;
      }

      if (data) {
        setApiKey(data.api_key);
        setCredits(data.credits ?? 50);
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
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-6 h-6 text-red-500" />
      </div>
    );
  }

  const checkoutUrl = `https://kian-agentnet1.lemonsqueezy.com/checkout/buy/cc334133-ff5c-4eee-8fca-99e66a2a3c2c?checkout[custom][user_id]=${userId}`;

  const getPlanName = () => {
    if (credits >= 50000) return "Scale Tier";
    if (credits > 50) return "Pro Tier";
    return "Starter (Free Tier)";
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-red-500/20 selection:text-red-200 overflow-x-hidden antialiased">
      
      {/* إضاءة خلفية دقيقة ومطابقة لصفحة الهبوط */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-red-500/5 via-zinc-900/0 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* الشريط العلوي - Navbar */}
      <nav className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* اللوجو الجديد بأيقونة المربع الأحمر */}
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              KIAN <span className="text-zinc-400 font-normal">AgentNet</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-zinc-400">
            <a href="mailto:hello@kian-agentnet.com" className="hover:text-white transition-colors">Support</a>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <div className="h-3.5 w-px bg-zinc-800" />
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* العنونة ونقطة الحالة النشطة */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              v1.04.21 · Edge Gateway Protocol
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Developer Console</h1>
            <p className="text-zinc-400 text-xs mt-1">Manage cryptographic keys, monitor real-time credit consumption, and test protocol nodes.</p>
          </div>
        </div>

        {/* بطاقات الإحصائيات (Metrics Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Card 1: API Credits */}
          <div className="bg-[#0f0f11] border border-zinc-800/80 rounded-xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">API Usage</span>
              <Activity size={16} className="text-zinc-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-mono">{credits}</span>
              <span className="text-xs text-zinc-500 font-mono">Credits</span>
            </div>
          </div>

          {/* Card 2: Extractions */}
          <div className="bg-[#0f0f11] border border-zinc-800/80 rounded-xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Successful Extractions</span>
              <Terminal size={16} className="text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-mono">0</span>
              <span className="text-xs text-zinc-500">requests</span>
            </div>
          </div>

          {/* Card 3: Current Plan / Upgrade */}
          <div className="bg-gradient-to-b from-zinc-900 to-[#0f0f11] border border-zinc-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Active Plan</span>
                <CreditCard size={16} className="text-red-400" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight">
                {getPlanName()}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 mb-4">Upgrade via Lemon Squeezy for higher limits.</p>
            </div>
            <a 
              href={checkoutUrl}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-lg transition-all shadow-sm"
            >
              Upgrade to Pro ($19.99) <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* القسم الرئيسي: API Keys & Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* قسم المفاتيح بنمط Terminal */}
          <div className="lg:col-span-2">
            <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              
              {/* شريط أعلى النافذة البرمجية */}
              <div className="bg-[#121215] px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
                  <span className="text-[11px] font-mono text-zinc-400 ml-2 flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400" /> authentication-credentials
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Cryptographic Key</span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Key size={15} className="text-red-500" />
                  <h2 className="text-sm font-semibold text-white">Secret API Key</h2>
                </div>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Use this high-entropy key to authenticate requests to the AgentNet Gateway. Keep it encrypted at rest.
                </p>

                <div className="flex items-center gap-2 bg-[#050506] p-2.5 rounded-lg border border-zinc-800/80 font-mono">
                  <span className="text-xs text-red-500 select-none">$</span>
                  <code className="text-xs text-zinc-300 flex-1 overflow-hidden text-ellipsis">
                    {apiKey || "Generating_Key..."}
                  </code>
                  <button 
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs transition-colors border border-zinc-700/50 flex items-center gap-1.5 font-sans"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* قسم الإجراءات السريعة - Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">Quick Actions</h2>
            
            <Link 
              href="/playground" 
              className="group block p-4 bg-[#0f0f11] hover:bg-[#141418] border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-zinc-900 group-hover:bg-red-500/10 rounded-lg text-zinc-400 group-hover:text-red-400 border border-zinc-800 transition-colors">
                  <Terminal size={18} />
                </div>
                <ExternalLink size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Protocol Playground</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Test web extractions visually and generate cryptographic payload signatures without writing code.
              </p>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}