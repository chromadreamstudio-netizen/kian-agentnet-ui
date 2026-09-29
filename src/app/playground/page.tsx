"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Trash2, Copy, Check, Terminal, Play, Braces
} from "lucide-react";

type SchemaField = {
  id: string;
  key: string;
  type: string;
  description: string;
};

export default function PlaygroundPage() {
  const [targetUrl, setTargetUrl] = useState("https://example.com/product/123");
  const [fields, setFields] = useState<SchemaField[]>([
    { id: "1", key: "product_name", type: "string", description: "The main title of the product" },
    { id: "2", key: "price", type: "number", description: "The numerical price" }
  ]);
  const [copied, setCopied] = useState(false);

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

  const curlCommand = `curl -X POST https://api.kian-agentnet.com/v1/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${jsonString}'`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              Protocol Playground <span className="text-zinc-500 font-normal">| JSON Builder</span>
            </span>
          </div>

          <Link 
            href="/dashboard" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Braces className="text-red-500" /> JSON Schema Builder
          </h1>
          <p className="text-sm text-zinc-400">
            Define your custom data structure. The KIAN Agent will extract exactly what you request.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input Form */}
          <div className="space-y-6">
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
              <label className="block text-sm font-semibold text-white mb-2">Target URL</label>
              <input 
                type="text" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                placeholder="https://..."
              />
            </div>

            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-white">Data Schema Fields</label>
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
                        placeholder="Description to help the AI extract it accurately..."
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
                
                {fields.length === 0 && (
                  <div className="text-center py-8 border border-dashed border-zinc-800 rounded-lg text-zinc-500 text-xs">
                    No fields added yet. Click &quot;Add Field&quot; to start building your schema.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Code Preview */}
          <div className="space-y-6">
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Terminal size={14} className="text-zinc-400" /> Generated cURL Request
                </div>
                <button
                  onClick={() => copyToClipboard(curlCommand)}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1 rounded transition-colors"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>
              
              <div className="p-4 bg-[#0a0a0c] flex-1 overflow-auto">
                <pre className="font-mono text-[13px] text-zinc-300 leading-relaxed">
                  <span className="text-red-400">curl</span> -X POST https://api.kian-agentnet.com/v1/extract \{'\n'}
                  {'  '}-H <span className="text-green-400">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span> \{'\n'}
                  {'  '}-H <span className="text-green-400">&quot;Content-Type: application/json&quot;</span> \{'\n'}
                  {'  '}-d <span className="text-yellow-300">&apos;{jsonString}&apos;</span>
                </pre>
              </div>

              <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Ready to test?</span>
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-black font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-lg shadow-red-500/20">
                  <Play size={14} className="fill-current" /> Execute Extraction
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}