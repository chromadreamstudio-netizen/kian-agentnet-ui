"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Play, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle, 
  Database, 
  ShieldCheck, 
  ArrowLeft, 
  Globe,
  Code2,
  Terminal
} from "lucide-react";

export default function ProtocolPlayground() {
  const [apiKey, setApiKey] = useState("sk_kian_913b5c3a6daa265cb6f3e98911c57c35");
  const [url, setUrl] = useState("https://ar.wikipedia.org/wiki/تاريخ_مصر");
  const [schema, setSchema] = useState("Extract core entities, dates, and structured historical events from this page.");
  
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunExtraction = async () => {
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const response = await fetch("https://kian-agentnet-backend.onrender.com/v1/gateway/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          url: url,
          target_schema: schema,
        }),
      });

      const data = await response.json();
      
      if (!response.ok || data.status === "gateway_error" || data.status === "fatal_error") {
        setError(data.message || "حدث خطأ غير معروف أثناء المعالجة.");
      } else {
        setOutput(data);
      }
    } catch {
      setError("فشل الاتصال بالخادم. تأكد من عمل الـ Backend.");
    } font-mono {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-red-500/20 selection:text-red-200 overflow-x-hidden antialiased">
      
      {/* إضاءة خلفية خافتة */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-red-500/5 via-zinc-900/0 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Protocol Playground <span className="text-red-400 text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">v1.0.4</span>
              </h1>
            </div>
          </div>
          
          <Link 
            href="/dashboard" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* العمود الأيسر: الإدخلات والمدخلات (Inputs) */}
        <div className="space-y-6">
          
          {/* كارت المصادقة Auth Key */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <ShieldCheck size={14} className="text-red-500" /> Authentication (X-API-Key)
              </label>
              <span className="text-[10px] font-mono text-zinc-500">Bearer Protocol</span>
            </div>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#050506] border border-zinc-800/80 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-red-500/50 transition-colors font-mono tracking-tight"
            />
            <p className="text-[11px] text-zinc-500 mt-2">Required for validating credit deduction on the Edge Gateway.</p>
          </div>

          {/* رابط الموقع Target URL */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-5 shadow-2xl">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              <Globe size={14} className="text-zinc-400" /> Target Website URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#050506] border border-zinc-800/80 rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-red-500/50 transition-colors font-mono"
              placeholder="https://example.com"
            />
          </div>

          {/* تعليمات الاستخراج Target Schema */}
          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-5 shadow-2xl">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              <Code2 size={14} className="text-zinc-400" /> Target Schema (Extraction Directives)
            </label>
            <textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              rows={4}
              className="w-full bg-[#050506] border border-zinc-800/80 rounded-lg p-3.5 text-xs text-zinc-300 font-mono focus:outline-none focus:border-red-500/50 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* زر التشغيل Run Extraction */}
          <button
            onClick={handleRunExtraction}
            disabled={loading}
            className={`w-full py-3.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
              loading 
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50" 
                : "bg-red-500 hover:bg-red-600 text-black shadow-red-500/20 active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin text-zinc-400" />
                Executing Gateway Protocol...
              </>
            ) : (
              <>
                <Play size={15} className="fill-black" />
                Run Extraction
              </>
            )}
          </button>
        </div>

        {/* العمود الأيمن: شاشة المخرجات (Terminal Output) */}
        <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl flex flex-col overflow-hidden shadow-2xl h-[620px]">
          
          {/* Terminal Header */}
          <div className="bg-[#121215] px-4 py-3 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
              <span className="text-[11px] font-mono text-zinc-400 ml-2 flex items-center gap-1.5">
                <Terminal size={12} className="text-red-400" /> structured-payload.json
              </span>
            </div>
            
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-[11px] font-sans text-zinc-300 transition-colors border border-zinc-700/50"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy JSON"}
              </button>
            )}
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-5 overflow-auto bg-[#050506] relative custom-scrollbar font-mono text-xs">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 bg-[#050506]/80 backdrop-blur-sm">
                <Loader2 size={32} className="animate-spin text-red-500 mb-3" />
                <p className="text-xs animate-pulse font-mono text-zinc-300">Parsing DOM Nodes & Synthesizing Payload...</p>
              </div>
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
                <p className="text-xs font-mono whitespace-pre-wrap">{error}</p>
              </div>
            ) : output ? (
              <pre className="text-xs leading-relaxed">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(output, null, 2)) }} />
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                <Database size={40} className="mb-3 stroke-1 text-zinc-700" />
                <p className="text-xs font-sans">Click &quot;Run Extraction&quot; to inspect real-time JSON responses.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

// تنسيق ألوان الـ JSON داخل التيرمينال ليتناسب مع الهوية
function syntaxHighlight(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-emerald-400';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-red-400';
      } else {
        cls = 'text-zinc-200';
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-amber-400';
    } else if (/null/.test(match)) {
      cls = 'text-zinc-500';
    } else {
      cls = 'text-purple-400';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}