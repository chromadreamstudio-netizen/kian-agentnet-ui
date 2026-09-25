"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, 
  Terminal, 
  Shield, 
  ArrowRight, 
  Cpu, 
  Globe, 
  Sparkles, 
  CheckCircle2,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // دالة لمسح الكوكي قبل التوجيه لصفحة التسجيل أو الدخول
  const handleAuthNavigation = (path: string) => {
    document.cookie = "kian-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <nav className="border-b border-gray-800/80 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Kian AgentNet
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link href="/playground" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-400" />
              Playground
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => handleAuthNavigation('/login')}
              className="text-sm px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => handleAuthNavigation('/signup')}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-800 bg-[#0a0a0a] px-6 py-4 space-y-3 text-sm">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300">Features</a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300">Architecture</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300">Pricing</a>
            <Link href="/playground" onClick={() => setMobileMenuOpen(false)} className="block text-blue-400 font-medium">
              Interactive Playground 🚀
            </Link>
            <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
              <button onClick={() => handleAuthNavigation('/login')} className="w-full text-center py-2 text-gray-300 hover:text-white font-medium">
                Sign In
              </button>
              <button onClick={() => handleAuthNavigation('/signup')} className="w-full text-center py-2 bg-blue-600 rounded-lg text-white font-medium">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-sm">
          <Sparkles size={14} />
          <span>AgentNet Protocol v2.0 Released</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Turn Any Web Page Into Clean <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Structured JSON for AI Agents
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
          High-performance web extraction gateway for autonomous LLM agents. Extract clean entities, schemas, and historical data with zero DOM headache.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            href="/playground" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/30 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Terminal size={18} />
            Test Live Playground
            <ArrowRight size={18} />
          </Link>

          <button 
            onClick={() => handleAuthNavigation('/signup')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-800 hover:bg-gray-800/60 text-gray-300 font-semibold text-base transition-all flex items-center justify-center gap-2"
          >
            <Shield size={18} className="text-yellow-500" />
            Get Free API Key
          </button>
        </div>

        {/* Code / Output Terminal Demo Preview */}
        <div className="max-w-4xl mx-auto bg-[#111111] rounded-2xl border border-gray-800/80 shadow-2xl overflow-hidden text-left">
          <div className="bg-[#0a0a0a] px-5 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs text-gray-500 font-mono ml-2">POST /v1/gateway/execute</span>
            </div>
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 font-mono">
              200 OK • 1.2s
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#050505] font-mono text-xs">
            {/* Request side */}
            <div className="space-y-3">
              <div className="text-gray-500 uppercase tracking-wider font-semibold text-[10px]">Input Request</div>
              <pre className="text-gray-300 bg-[#0d0d0d] p-4 rounded-lg border border-gray-800/60 leading-relaxed overflow-x-auto">
{`{
  "url": "https://ar.wikipedia.org/wiki/تاريخ_مصر",
  "target_schema": "Extract core entities & dates"
}`}
              </pre>
            </div>

            {/* Response side */}
            <div className="space-y-3">
              <div className="text-gray-500 uppercase tracking-wider font-semibold text-[10px]">AgentNet JSON Output</div>
              <pre className="text-blue-400 bg-[#0d0d0d] p-4 rounded-lg border border-gray-800/60 leading-relaxed overflow-x-auto">
{`{
  "status": "success",
  "entities": [
    { "name": "مصر", "type": "دولة" },
    { "name": "نهر النيل", "type": "معلم جغرافي" },
    { "name": "مينا", "type": "شخصية تاريخية" }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Built for Next-Gen Autonomous AI Agents</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Eliminate fragile web scrapers. Let AI models read, format, and structure web data with guaranteed JSON outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-gray-800/70 hover:border-blue-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Gemini 3.5 Powered</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Leverages high-speed LLMs to accurately parse unstructured HTML into strict schema matches.
            </p>
          </div>

          <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-gray-800/70 hover:border-yellow-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Supabase X-API-Key Auth</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Enterprise-grade rate limiting, key verification, and real-time usage metrics tracking.
            </p>
          </div>

          <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-gray-800/70 hover:border-purple-500/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Multilingual DOM Support</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Seamlessly handles Arabic, English, and international encoding right out of the box.
            </p>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-800/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Transparent Developer Pricing</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Start with 1,000 free API credits. Scale effortlessly as your AI agents grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Free Plan */}
          <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Developer Tier</div>
              <h3 className="text-2xl font-bold mb-2">Hobby</h3>
              <div className="text-4xl font-extrabold mb-6">$0 <span className="text-sm font-normal text-gray-400">/ forever</span></div>
              
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> 100 Free API Credits</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> Interactive Protocol Playground</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> Standard Rate Limits</li>
              </ul>
            </div>

            <button 
              onClick={() => handleAuthNavigation('/signup')}
              className="w-full py-3 rounded-xl border border-gray-700 hover:bg-gray-800 text-center font-semibold text-sm transition-colors block"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#111827] p-8 rounded-2xl border border-blue-500/50 flex flex-col justify-between relative shadow-2xl shadow-blue-500/10">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Popular
            </div>
            
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Production Tier</div>
              <h3 className="text-2xl font-bold mb-2">Pro Agent</h3>
              <div className="text-4xl font-extrabold mb-6">$29 <span className="text-sm font-normal text-gray-400">/ month</span></div>
              
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> 50,000 API Credits / Month</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> High-Priority Agent Execution</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Dedicated Fast Routing Gateway</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> 24/7 Developer Support</li>
              </ul>
            </div>

            <Link 
              href="/dashboard" 
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-center font-bold text-sm text-white transition-colors shadow-lg shadow-blue-600/30 block"
            >
              Upgrade in Dashboard
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#070707] py-12 text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-white">
            <Zap size={18} className="text-blue-500" />
            <span>Kian AgentNet Protocol</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/playground" className="hover:text-gray-300 transition-colors">Playground</Link>
            <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
            <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a>
          </div>

          <div>
            © {new Date().getFullYear()} Kian Solutions. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}