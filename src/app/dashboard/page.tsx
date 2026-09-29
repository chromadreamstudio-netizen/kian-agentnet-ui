"use client";

import { useState } from "react";
import Link from "next/link";
import { Key, Copy, Check, Shield, Zap, CreditCard } from "lucide-react";

export default function DashboardPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // دالة لتوليد المفتاح (يمكنك ربطها بـ Supabase لاحقاً)
  const handleGenerateKey = async () => {
    setIsGenerating(true);
    // محاكاة وقت التحميل ليعطي شعوراً احترافياً
    setTimeout(() => {
      const generatedKey = "sk_kian_" + Math.random().toString(36).substr(2, 12) + "93f002c67";
      setApiKey(generatedKey);
      setIsGenerating(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              Dashboard <span className="text-zinc-500 font-normal">| KIAN AgentNet</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
              <CreditCard size={14} /> Upgrade Plan
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to KIAN AgentNet</h1>
          <p className="text-sm text-zinc-400">Manage your API keys, monitor usage, and configure your autonomous agents.</p>
        </div>

        {/* API Key Section */}
        <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Shield className="text-red-400" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Authentication</h2>
              <p className="text-xs text-zinc-400">Your secret API key for executing tasks.</p>
            </div>
          </div>

          {!apiKey ? (
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 text-center">
              <Key className="mx-auto text-zinc-500 mb-4" size={32} />
              <h3 className="text-sm font-medium text-zinc-200 mb-2">No API Key Found</h3>
              <p className="text-xs text-zinc-400 mb-6 max-w-sm mx-auto">
                Generate your first secret key to start connecting your agents to the KIAN network. You currently have 50 free credits.
              </p>
              <button 
                onClick={handleGenerateKey}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-black font-bold text-sm px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="animate-pulse flex items-center gap-2">Generating Key...</span>
                ) : (
                  <>
                    <Zap size={16} /> Generate Secret Key
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-mono text-sm text-zinc-300 break-all select-all">
                  {apiKey}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg transition-colors border border-zinc-700/50"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Key"}
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                <AlertCircle size={12} className="text-yellow-500/70" /> 
                Keep this key secret. Do not expose it in client-side code (e.g., browsers or mobile apps).
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}