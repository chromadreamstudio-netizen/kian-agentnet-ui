"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Copy, Check, Loader2, AlertCircle, Database, Shield } from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center gap-3">
            Protocol Playground 🚀
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Test the AgentNet Web Protocol instantly with your API Key.
          </p>
        </div>
        <Link 
          href="/" 
          className="px-4 py-2 rounded-lg border border-gray-800 text-sm hover:bg-gray-800/50 transition-all text-gray-300"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          
          {/* Auth Card */}
          <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-2xl shadow-black/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
            <label className="flex items-center gap-2 text-sm text-yellow-500 mb-3 font-medium">
              <Shield size={16} /> Authentication (X-API-Key)
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-yellow-500/50 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-2">Required to authenticate your request via Supabase database.</p>
          </div>

          {/* URL Input */}
          <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-xl">
            <label className="block text-sm text-gray-400 mb-3 font-medium">1. Target Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50 transition-colors"
              placeholder="https://example.com"
            />
          </div>

          {/* Schema Input */}
          <div className="bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-xl">
            <label className="block text-sm text-gray-400 mb-3 font-medium">2. Target Schema (Extraction Instructions)</label>
            <textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              rows={4}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 text-sm text-blue-400 font-mono focus:outline-none focus:border-blue-500/50 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunExtraction}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
              loading 
                ? "bg-blue-600/50 cursor-not-allowed text-white/70" 
                : "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] text-white"
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
        <div className="bg-[#111111] rounded-xl border border-gray-800 flex flex-col overflow-hidden shadow-2xl h-[700px]">
          
          {/* Terminal Header */}
          <div className="bg-[#0a0a0a] border-b border-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Database size={16} />
              <span>Structured Output</span>
            </div>
            
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-xs font-medium text-gray-300 transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy JSON"}
              </button>
            )}
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-6 overflow-auto bg-[#050505] relative custom-scrollbar">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-500/50">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="text-sm animate-pulse">Initializing AI Agents... reading DOM...</p>
              </div>
            ) : error ? (
              <div className="flex items-start gap-3 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm font-mono whitespace-pre-wrap">{error}</p>
              </div>
            ) : output ? (
              <pre className="text-[13px] font-mono leading-relaxed text-[#a5d6ff]">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(output, null, 2)) }} />
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600">
                <Database size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Click &quot;Run Extraction&quot; to see the magic.</p>
              </div>
            )}
          </div>
        </div>

      </div>
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