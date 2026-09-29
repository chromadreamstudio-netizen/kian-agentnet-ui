"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { 
  Key, Copy, Check, Shield, Zap, CreditCard, 
  AlertCircle, Terminal, BookOpen, Webhook, ArrowRight, Code2, Sparkles
} from "lucide-react";

// إعداد اتصال Supabase
// تأكد من وجود المتغيرات في ملف .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DashboardPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    
    try {
      // 1. توليد المفتاح العشوائي
      const generatedKey = "sk_kian_" + Math.random().toString(36).substr(2, 12) + "93f002c67";
      
      // 2. إرسال المفتاح إلى قاعدة بيانات Supabase
      const { error } = await supabase
        .from('api_keys')
        .insert([
          { 
            api_key: generatedKey, 
            is_active: true, 
            credits: 50 
          }
        ]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        alert("حدث خطأ أثناء حفظ المفتاح في الداتابيز. تحقق من صلاحيات الجداول في Supabase.");
        setIsGenerating(false);
        return;
      }

      // 3. عرض المفتاح في الواجهة
      setApiKey(generatedKey);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, setCopyState: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopyState(true);
    setTimeout(() => setCopyState(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-20">
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
            <Link 
              href="/playground" 
              className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all"
            >
              <Code2 size={14} /> JSON Code Generator
            </Link>
            <Link href="/pricing" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
              <CreditCard size={14} /> Plans
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to KIAN AgentNet</h1>
          <p className="text-sm text-zinc-400">Generate your API key and start building structured JSON extraction schemas.</p>
        </div>

        {/* API Key Section */}
        <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Shield className="text-red-400" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">1. Authentication Key</h2>
              <p className="text-xs text-zinc-400">Your secret API key to power your agents and JSON schemas.</p>
            </div>
          </div>

          {!apiKey ? (
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 text-center relative z-10">
              <Key className="mx-auto text-zinc-500 mb-4" size={32} />
              <h3 className="text-sm font-medium text-zinc-200 mb-2">No API Key Generated Yet</h3>
              <p className="text-xs text-zinc-400 mb-6 max-w-sm mx-auto">
                Generate your free key to unlock the JSON Schema Generator and start extracting data.
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
                    <Zap size={16} /> Generate Free API Key
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-mono text-sm text-zinc-300 break-all select-all">
                  {apiKey}
                </div>
                <button
                  onClick={() => copyToClipboard(apiKey, setCopied)}
                  className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg transition-colors border border-zinc-700/50"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Key"}
                </button>
              </div>

              <div className="bg-gradient-to-r from-red-500/10 via-zinc-900 to-zinc-900 border border-red-500/30 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                    <Sparkles size={14} /> Step 2: Next Action Required
                  </div>
                  <h3 className="text-base font-bold text-white">Create Your First JSON Extraction Schema</h3>
                  <p className="text-xs text-zinc-400 max-w-lg">
                    Now use your API key inside the JSON Builder to define custom data fields and generate extraction code.
                  </p>
                </div>
                <Link
                  href="/playground"
                  className="shrink-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-black font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-500/25 hover:scale-[1.02]"
                >
                  <Code2 size={18} /> Build JSON Code Now <ArrowRight size={16} />
                </Link>
              </div>

              <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                <AlertCircle size={12} className="text-yellow-500/70" /> 
                Keep this key secret. Do not expose it in client-side code.
              </p>
            </div>
          )}
        </div>

        {/* Quick Start Code Snippet */}
        {apiKey && (
          <div className="mt-8 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Terminal className="text-zinc-400" size={20} /> Developer Quick Start
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              You can also execute JSON schema extractions directly via cURL or n8n:
            </p>

            <div className="relative group">
              <div className="absolute right-3 top-3">
                <button
                  onClick={() => copyToClipboard(`curl -X POST https://api.kian-agentnet.com/v1/extract \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"target": "https://example.com", "schema": {"title": "string", "price": "number"}}'`, setCodeCopied)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md transition-colors border border-zinc-700/50"
                >
                  {codeCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>
              <pre className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-4 font-mono text-[13px] text-zinc-300 overflow-x-auto leading-relaxed">
                <span className="text-red-400">curl</span> -X POST https://api.kian-agentnet.com/v1/extract \{'\n'}
                {'  '}-H <span className="text-green-400">&quot;Authorization: Bearer {apiKey}&quot;</span> \{'\n'}
                {'  '}-H <span className="text-green-400">&quot;Content-Type: application/json&quot;</span> \{'\n'}
                {'  '}-d <span className="text-yellow-300">&apos;&#123;&quot;target&quot;: &quot;https://example.com&quot;, &quot;schema&quot;: &#123;&quot;title&quot;: &quot;string&quot;&#125;&#125;&apos;</span>
              </pre>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-zinc-800/50">
              <Link href="/playground" className="flex items-center gap-2 text-sm text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors border border-zinc-700/50 font-medium">
                <Code2 size={16} className="text-red-400" /> Open Interactive JSON Playground
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg transition-colors border border-zinc-700/30">
                <BookOpen size={16} className="text-red-400" /> API Documentation
              </Link>
              <Link href="#" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 px-4 py-2 rounded-lg transition-colors border border-zinc-700/30">
                <Webhook size={16} className="text-red-400" /> n8n &amp; Python Setup
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}