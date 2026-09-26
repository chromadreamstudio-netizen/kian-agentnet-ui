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
  Zap,
  LogOut,
  Loader2,
  ArrowRight
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [apiKey, setApiKey] = useState("");
  const [credits, setCredits] = useState(100);
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
            credits: 100,
            is_active: true
          }])
          .select()
          .single();

        if (newData) data = newData;
      }

      if (data) {
        setApiKey(data.api_key);
        setCredits(data.credits ?? 100);
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
      <div className="min-h-screen bg-kian-900 flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-8 h-8 text-kian-brand" />
      </div>
    );
  }

  const checkoutUrl = `https://kian-agentnet1.lemonsqueezy.com/checkout/buy/cc334133-ff5c-4eee-8fca-99e66a2a3c2c?checkout[custom][user_id]=${userId}`;

  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30 overflow-x-hidden">
      
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-kian-brand/20 rounded-full mix-blend-screen filter blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-kian-accent/10 rounded-full mix-blend-screen filter blur-[120px]" />
      </div>

      <nav className="border-b border-white/5 bg-kian-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kian-brand to-kian-accent flex items-center justify-center shadow-lg shadow-kian-brand/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Kian AgentNet</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@kian-agentnet.com" className="text-sm text-gray-400 hover:text-white transition-colors">Support</a>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
            <div className="h-4 w-px bg-white/10"></div>
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
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome back, Developer 👋</h1>
          <p className="text-gray-400 text-sm">Manage your API keys, monitor usage, and test the protocol.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-kian-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 text-kian-glow mb-4">
              <Activity size={20} />
              <h3 className="font-semibold text-gray-200">API Usage (Credits)</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-extrabold">{credits}</span>
              <span className="text-gray-500 mb-1">Credits</span>
            </div>
          </div>

          <div className="bg-kian-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 text-emerald-400 mb-4">
              <Terminal size={20} />
              <h3 className="font-semibold text-gray-200">Successful Extractions</h3>
            </div>
            <div className="text-4xl font-extrabold">0</div>
          </div>

          <div className="bg-gradient-to-b from-kian-brand/10 to-transparent border border-kian-brand/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-kian-brand/10 rounded-bl-full blur-2xl"></div>
            <div className="flex items-center gap-3 text-kian-brand mb-4">
              <CreditCard size={20} />
              <h3 className="font-semibold text-gray-200">Current Plan</h3>
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {credits > 1000 ? "Pro Tier" : "Hobby (Free Tier)"}
            </div>
            <p className="text-sm text-gray-400 mb-6">Upgrade via Lemon Squeezy for higher limits.</p>
            <a 
              href={checkoutUrl}
              className="w-full flex items-center justify-center gap-2 py-3 bg-kian-brand hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-kian-brand/20"
            >
              Upgrade Plan ($19) <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-kian-800/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-kian-glow" />
                  <h2 className="text-lg font-bold text-white">Authentication & API Keys</h2>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Use this key to authenticate your requests to the AgentNet Gateway. Keep it secret.
              </p>
              <div className="flex items-center gap-3 bg-kian-900/80 p-3.5 rounded-xl border border-white/10">
                <code className="text-sm text-kian-glow font-mono flex-1 overflow-hidden text-ellipsis">
                  {apiKey || "Generating Key..."}
                </code>
                <button 
                  onClick={handleCopy}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 border border-white/10 flex items-center gap-1.5 text-xs font-medium"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h2>
            <Link href="/playground" className="flex items-start gap-4 p-5 bg-kian-800/40 backdrop-blur-md border border-white/10 rounded-2xl hover:border-kian-brand/50 hover:bg-kian-800/60 transition-all group">
              <div className="p-3 bg-kian-brand/10 rounded-xl group-hover:bg-kian-brand/20 text-kian-glow transition-colors">
                <Terminal size={22} />
              </div>
              <div>
                <h3 className="font-bold text-gray-200 mb-1 group-hover:text-white transition-colors">Protocol Playground</h3>
                <p className="text-xs text-gray-400">Test extractions visually without writing any code.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}