"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Trash2, Copy, Check, Terminal, Play, Braces, Key, Eye, EyeOff, Sparkles, RefreshCw
} from "lucide-react";

type SchemaField = {
  id: string;
  key: string;
  type: string;
  description: string;
};

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("sk_kian_c6z9wk1grqq93f002c67");
  const [showKey, setShowKey] = useState(false);
  const [targetUrl, setTargetUrl] = useState("https://example.com/product/123");
  const [fields, setFields] = useState<SchemaField[]>([
    { id: "1", key: "product_name", type: "string", description: "The main title of the product" },
    { id: "2", key: "price", type: "number", description: "The numerical price" }
  ]);
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResponse, setExecutionResponse] = useState<string | null>(null);

  const addField = () => {
    setFields([...fields, { id: Math.random().toString(), key: "", type: "string", description: "" }]);
  };

  const updateField = (id: string, key: keyof SchemaField, value: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const generatedSchema = fields.reduce((acc, field) => {
    if (field.key) {
      acc[field.key] = field.type;
    }
    return acc;
  }, {} as Record<string, string>);

  const payloadObject = {
    target: targetUrl,
    schema: generatedSchema
  };

  const jsonString = JSON.stringify(payloadObject, null, 2);

  const activeKey = apiKey.trim() || "YOUR_API_KEY";

  const curlCommand = `curl -X POST https://api.kian-agentnet.com/v1/extract \\
  -H "Authorization: Bearer ${activeKey}" \\
  -H "Content-Type: application/json" \\
  -d '${jsonString}'`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setExecutionResponse(null);
    setTimeout(() => {
      const mockResult = {
        status: "success",
        credits_used: 1,
        credits_remaining: 49,
        execution_time_ms: 342,
        data: {
          product_name: "KIAN Enterprise Autonomous Agent Node",
          price: 299.99
        }
      };
      setExecutionResponse(JSON.stringify(mockResult, null, 2));
      setIsExecuting(false);
    }, 1400);
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
              Protocol Playground <span className="text-zinc-500 font-normal">| JSON Schema Builder</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
              <Sparkles size={13} className="text-red-400" /> Starter Plan: <strong className="text-white">50 Credits</strong>
            </span>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:text-white transition-all"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Braces className="text-red-500" /> Interactive Playground &amp; API Tester
          </h1>
          <p className="text-sm text-zinc-400">
            Paste your API key, target URL, and JSON schema to test real-time extraction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Config */}
          <div className="space-y-6">
            
            {/* API Key Input Section */}
            <div className="bg-[#0c0c0e] border border-red-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Key size={14} /> Your Secret API Key
                </label>
                <button 
                  onClick={() => setShowKey(!showKey)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs flex items-center gap-1"
                >
                  {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
              <input 
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your sk_kian_... key here"
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-4 py-2.5 font-mono text-xs text-zinc-200 focus:outline-none focus:border-red-500/50 transition-all"
              />
            </div>

            {/* Target URL */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
              <label className="block text-sm font-semibold text-white mb-2">Target URL</label>
              <input 
                type="text" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                placeholder="https://example.com/data"
              />
            </div>

            {/* Schema Fields */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-white">JSON Extraction Schema</label>
                <button 
                  onClick={addField}
                  className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-red-500/20"
                >
                  <Plus size={14} /> Add Field
                </button>
              </div>

              <div className="space-y-3">
                {fields.map((field) => (
                  <div key={field.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={field.key}
                          onChange={(e) => updateField(field.id, "key", e.target.value)}
                          placeholder="field_name"
                          className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-600"
                        />
                        <select 
                          value={field.type}
                          onChange={(e) => updateField(field.id, "type", e.target.value)}
                          className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none focus:border-zinc-600"
                        >
                          <option value="string">String (Text)</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="array">Array (List)</option>
                        </select>
                      </div>
                      <input 
                        type="text" 
                        value={field.description}
                        onChange={(e) => updateField(field.id, "description", e.target.value)}
                        placeholder="Description for AI extraction..."
                        className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none focus:border-zinc-700"
                      />
                    </div>
                    <button 
                      onClick={() => removeField(field.id)}
                      className="p-2.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-0.5"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Code & Live Execution Output */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Terminal size={14} className="text-zinc-400" /> Dynamic Request
                </div>
                <button
                  onClick={() => copyToClipboard(curlCommand)}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1 rounded transition-colors"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy cURL"}
                </button>
              </div>
              
              <div className="p-4 bg-[#0a0a0c] overflow-auto max-h-[260px]">
                <pre className="font-mono text-[12px] text-zinc-300 leading-relaxed break-all whitespace-pre-wrap">
                  <span className="text-red-400">curl</span> -X POST https://api.kian-agentnet.com/v1/extract \{'\n'}
                  {'  '}-H <span className="text-green-400">&quot;Authorization: Bearer {activeKey}&quot;</span> \{'\n'}
                  {'  '}-H <span className="text-green-400">&quot;Content-Type: application/json&quot;</span> \{'\n'}
                  {'  '}-d <span className="text-yellow-300">&apos;{jsonString}&apos;</span>
                </pre>
              </div>

              <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Test live payload execution</span>
                <button 
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-black font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" /> Extracting Data...
                    </>
                  ) : (
                    <>
                      <Play size={14} className="fill-current" /> Execute Extraction
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Window */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[220px] flex flex-col">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Response Terminal Output
                </span>
                {executionResponse && (
                  <span className="text-[10px] font-mono text-zinc-500">HTTP 200 OK</span>
                )}
              </div>
              <div className="p-4 bg-[#0a0a0c] font-mono text-xs text-green-400 flex-1 overflow-auto">
                {executionResponse ? (
                  <pre className="whitespace-pre-wrap">{executionResponse}</pre>
                ) : (
                  <div className="text-zinc-600 text-center py-10 italic">
                    Click &quot;Execute Extraction&quot; to test your JSON schema and API key against the KIAN engine.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}