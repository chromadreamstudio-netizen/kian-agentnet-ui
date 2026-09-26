"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Copy, Check, Loader2, AlertCircle, Database, Shield, ArrowLeft, Zap } from "lucide-react";

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
    } finally {
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
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30 overflow-x-hidden">
      
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-kian-brand/25 rounded-full mix-blend-screen filter blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-kian-accent/15 rounded-full mix-blend-screen filter blur-[120px]" />
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-kian-900/80 backdrop-blur-xl sticky top-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kian-brand to-kian-accent flex items-center justify-center shadow-lg shadow-kian-brand/20">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Protocol Playground <span className="text-kian-glow text-sm font-mono px-2 py-0.5 rounded-full bg-kian-brand/10 border border-kian-brand/20">v1.0</span>
              </h1>
              <p className="text-gray-400 text-xs hidden sm:block">
                Test the AgentNet Web Protocol instantly with your API Key.
              </p>
            </div>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-sm transition-all text-gray-300 font-medium"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          
          {/* Auth Card */}
          <div className="bg-kian-800/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-kian-glow"></div>
            <label className="flex items-center gap-2 text-sm text-kian-glow mb-3 font-semibold">
              <Shield size={16} /> Authentication (X-API-Key)
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-kian-900/80 border border-white/10 rounded-xl p-3.5 text-sm text-gray-200 focus:outline-none focus:border-kian-brand transition-colors font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">Required to authenticate your request via Supabase database.</p>
          </div>

          {/* URL Input */}
          <div className="bg-kian-800/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <label className="block text-sm text-gray-300 mb-3 font-semibold">1. Target Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-kian-900/80 border border-white/10 rounded-xl p-3.5 text-sm text-gray-200 focus:outline-none focus:border-kian-brand transition-colors font-mono"
              placeholder="https://example.com"
            />
          </div>

          {/* Schema Input */}
          <div className="bg-kian-800/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
            <label className="block text-sm text-gray-300 mb-3 font-semibold">2. Target Schema (Extraction Instructions)</label>
            <textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              rows={4}
              className="w-full bg-kian-900/80 border border-white/10 rounded-xl p-4 text-sm text-kian-glow font-mono focus:outline-none focus:border-kian-brand transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunExtraction}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
              loading 
                ? "bg-kian-brand/50 cursor-not-allowed text-white/70 shadow-none" 
                : "bg-kian-brand hover:bg-blue-500 text-white shadow-kian-brand/30 hover:shadow-kian-brand/50"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing Protocol...
              </>
            ) : (
              <>
                <Play size={20} />
                Run Extraction
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Terminal */}
        <div className="bg-kian-800/40 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl h-[700px]">
          
          {/* Terminal Header */}
          <div className="bg-kian-900/80 border-b border-white/10 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
              <Database size={16} className="text-kian-brand" />
              <span>Structured Output</span>
            </div>
            
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-gray-300 transition-colors border border-white/10"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy JSON"}
              </button>
            )}
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-6 overflow-auto bg-[#030712] relative custom-scrollbar">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-kian-glow bg-kian-900/40 backdrop-blur-sm">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="text-sm animate-pulse font-medium">Initializing AI Agents... reading DOM...</p>
              </div>
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm font-mono whitespace-pre-wrap">{error}</p>
              </div>
            ) : output ? (
              <pre className="text-[13px] font-mono leading-relaxed text-[#a5d6ff]">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(output, null, 2)) }} />
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <Database size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Click &quot;Run Extraction&quot; to see the magic.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

function syntaxHighlight(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-[#79c0ff]';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-[#d2a8ff]';
      } else {
        cls = 'text-[#a5d6ff]';
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-[#ff7b72]';
    } else if (/null/.test(match)) {
      cls = 'text-[#ff7b72]';
    } else {
      cls = 'text-[#f0883e]';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}