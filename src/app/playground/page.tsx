"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Trash2, Copy, Check, Key, Sparkles, RefreshCw, Code2, Globe, Database, Cpu, Wand2, Settings2
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
  const [credits, setCredits] = useState(49);
  const [codeLang, setCodeLang] = useState<"cURL" | "Node.js" | "Python">("cURL");
  
  const [targetUrl, setTargetUrl] = useState("https://www.aliexpress.us/item/3256811494265096.html");
  
  // وضع الاستخراج: إما تلقائي (نينجا) أو مخصص (حقول)
  const [extractionMode, setExtractionMode] = useState<"auto" | "custom">("auto");
  
  const [fields, setFields] = useState<SchemaField[]>([
    { id: "1", key: "product_name", type: "string", description: "The full, exact title of the product." },
    { id: "2", key: "price", type: "number", description: "The final sale price. Ignore currency symbols." }
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
      acc[field.key] = `${field.type} - Prompt to AI: ${field.description}`;
    }
    return acc;
  }, {} as Record<string, string>);

  // نحدد ما سنرسله للباك إند بناءً على الوضع المختار
  const payloadObject = {
    url: targetUrl,
    target_schema: extractionMode === "auto" 
      ? "Extract core entities, prices, structured specifications, and metadata." 
      : JSON.stringify(generatedSchema)
  };

  const activeKey = apiKey.trim() || "YOUR_API_KEY";
  const BACKEND_URL = "https://kian-agentnet-backend.onrender.com/v1/gateway/execute";

  const getCodeSnippet = () => {
    const jsonString = JSON.stringify(payloadObject, null, 2);
    
    if (codeLang === "cURL") {
      return `curl -X POST ${BACKEND_URL} \\\n  -H "X-API-Key: ${activeKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '${jsonString}'`;
    } else if (codeLang === "Node.js") {
      return `// Copy this into your Node.js app\nconst response = await fetch("${BACKEND_URL}", {\n  method: "POST",\n  headers: {\n    "X-API-Key": "${activeKey}",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify(${jsonString.replace(/\n/g, '\n  ')})\n});\n\nconst data = await response.json();\nconsole.log(data);`;
    } else if (codeLang === "Python") {
      return `# Copy this into your Python script\nimport requests\n\nurl = "${BACKEND_URL}"\nheaders = {\n    "X-API-Key": "${activeKey}",\n    "Content-Type": "application/json"\n}\npayload = ${jsonString.replace(/\n/g, '\n')}\n\nresponse = requests.post(url, headers=headers, json=payload)\nprint(response.json())`;
    }
    return "";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionResponse(null);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": activeKey
        },
        body: JSON.stringify(payloadObject)
      });

      const data = await response.json();
      
      if (response.ok && data.status === "success") {
        setCredits(prev => Math.max(0, prev - 1));
      }

      setExecutionResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setExecutionResponse(JSON.stringify({
        status: "error",
        message: "Failed to connect to Render backend.",
        details: errorMessage
      }, null, 2));
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-20">
      <header className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              Kian Auto-Scraper <span className="text-zinc-500 font-normal">| Smart Extraction</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
              <Sparkles size={13} className="text-red-400" /> Plan: <strong className="text-white">{credits} Credits</strong>
            </span>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:text-white transition-all"
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-2xl font-bold text-white">Extract Data from Any Website</h1>
          <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
            Follow the 3 simple steps below. Tell the AI what you want, and it will browse the site and grab the data for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1 */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-zinc-800 text-white font-bold rounded-full flex items-center justify-center border-4 border-[#09090b]">1</div>
              <label className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                <Globe size={16} className="text-red-400" /> Target Website URL
              </label>
              <p className="text-xs text-zinc-500 mb-4">Paste the link of the page you want to extract data from.</p>
              
              <input 
                type="text" 
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                placeholder="https://..."
              />
            </div>

            {/* Step 2 */}
            <div className="bg-[#0c0c0e] border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-zinc-800 text-white font-bold rounded-full flex items-center justify-center border-4 border-[#09090b]">2</div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center gap-2 text-sm font-bold text-white">
                  <Database size={16} className="text-red-400" /> What to Extract? (Schema)
                </label>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 mb-5">
                <button 
                  onClick={() => setExtractionMode("auto")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-md transition-all ${extractionMode === "auto" ? "bg-red-500/10 text-red-400 border border-red-500/20 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Wand2 size={14} /> E-Commerce Auto-Pilot
                </button>
                <button 
                  onClick={() => setExtractionMode("custom")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-md transition-all ${extractionMode === "custom" ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <Settings2 size={14} /> Custom Schema
                </button>
              </div>

              {/* Auto Mode View */}
              {extractionMode === "auto" && (
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 text-center space-y-2">
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles size={20} className="text-red-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Magic Extraction Enabled</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
                    Kian AI will automatically analyze the page and extract <strong className="text-zinc-200">Products, Prices, High-Res Images, Variants, and Specifications</strong> without needing any setup.
                  </p>
                </div>
              )}

              {/* Custom Mode View */}
              {extractionMode === "custom" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-zinc-500">Define specific fields for custom data scraping (Real Estate, News, Directories).</p>
                    <button 
                      onClick={addField}
                      className="flex items-center gap-1.5 text-xs font-medium text-white hover:text-red-300 bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors border border-zinc-700"
                    >
                      <Plus size={14} /> Add Field
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {fields.map((field) => (
                      <div key={field.id} className="flex gap-3 items-start bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                        <div className="flex-1 space-y-3">
                          <div className="flex gap-2">
                            <div className="w-1/2">
                              <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Field Name</label>
                              <input 
                                type="text" 
                                value={field.key}
                                onChange={(e) => updateField(field.id, "key", e.target.value)}
                                placeholder="e.g. price"
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500/50"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Data Type</label>
                              <select 
                                value={field.type}
                                onChange={(e) => updateField(field.id, "type", e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none focus:border-red-500/50"
                              >
                                <option value="string">Text (String)</option>
                                <option value="number">Number</option>
                                <option value="boolean">True/False (Boolean)</option>
                                <option value="array">List (Array)</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Instructions for AI (Crucial)</label>
                            <input 
                              type="text" 
                              value={field.description}
                              onChange={(e) => updateField(field.id, "description", e.target.value)}
                              placeholder="Tell the AI exactly what to look for..."
                              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-red-500/50"
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => removeField(field.id)}
                          className="p-2 text-zinc-600 hover:text-red-400 bg-zinc-800 hover:bg-red-500/10 rounded-lg transition-colors mt-5"
                          title="Remove field"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                  <Key size={12} /> Authentication Key
                </label>
                <div className="relative">
                  <input 
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-700 py-1 text-xs text-zinc-300 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>
              <button onClick={() => setShowKey(!showKey)} className="text-zinc-500 hover:text-zinc-300 text-xs mt-4">
                {showKey ? "Hide" : "Show"}
              </button>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-6 flex flex-col">
            
            {/* Step 3 */}
            <div className="bg-[#0c0c0e] border border-red-500/30 rounded-2xl p-1 shadow-xl relative flex-1 flex flex-col min-h-[300px]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-500 text-black font-bold rounded-full flex items-center justify-center border-4 border-[#09090b] z-10">3</div>
              
              <div className="p-5 border-b border-zinc-800/50 flex flex-col items-center justify-center gap-3">
                <p className="text-xs text-zinc-400 text-center">Ready? Let the AI navigate the site and grab your data.</p>
                <button 
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-black font-bold text-sm px-5 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:shadow-none"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> AI is Extracting Data...
                    </>
                  ) : (
                    <>
                      <Cpu size={16} className="fill-current" /> Run Extraction Now
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 bg-[#050505] rounded-b-xl p-4 flex flex-col overflow-hidden relative">
                <span className="absolute top-2 right-3 text-[9px] uppercase tracking-widest text-zinc-600 font-bold">AI Response</span>
                <div className="mt-4 flex-1 overflow-auto font-mono text-xs text-green-400">
                  {executionResponse ? (
                    <pre className="whitespace-pre-wrap">{executionResponse}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-600 text-center italic px-4">
                      The extracted JSON data will appear here.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <Code2 size={14} /> Developer API Code
                </span>
                <span className="text-[10px] text-zinc-500 italic">Optional</span>
              </div>
              
              <div className="flex items-center gap-1 px-3 py-1.5 border-b border-zinc-800 bg-[#0a0a0c]">
                {(["cURL", "Node.js", "Python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLang(lang)}
                    className={`px-3 py-1 text-[10px] font-medium rounded transition-all ${
                      codeLang === lang ? "bg-zinc-800 text-zinc-200" : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
                <div className="flex-1"></div>
                <button
                  onClick={() => copyToClipboard(getCodeSnippet())}
                  className="flex items-center gap-1 text-[10px] font-medium text-red-400 hover:text-red-300"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="p-3 bg-[#050505] overflow-auto max-h-[150px]">
                <pre className="font-mono text-[10px] text-zinc-500 leading-relaxed whitespace-pre-wrap">
                  {getCodeSnippet()}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}