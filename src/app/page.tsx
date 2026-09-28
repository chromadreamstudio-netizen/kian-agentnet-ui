'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, ArrowRight, Terminal, Shield, Cpu, Activity, 
  ChevronDown, Sparkles
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does Kian AgentNet handle authentication?",
      a: "AgentNet uses high-entropy cryptographic API keys (`sk_kian_...`) attached to your headers. Every request is verified via Edge infrastructure in real-time with zero performance overhead."
    },
    {
      q: "What happens when I exhaust my free credits?",
      a: "On the Free Tier (Hobby), you receive 100 API credits. Once depleted, you can instantly upgrade to the Pro Tier via Lemon Squeezy to unlock 50,000 monthly credits and unthrottled bandwidth."
    },
    {
      q: "Can I integrate Kian AgentNet with Python and Next.js?",
      a: "Yes! AgentNet exposes standard REST endpoints compatible with standard HTTP client libraries in Python, TypeScript, Node.js, and cURL."
    },
    {
      q: "Is there an uptime SLA for enterprise agents?",
      a: "Our Edge gateway features a 99.99% operational uptime SLA with automated fallback nodes distributed globally for sub-second responses."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[60rem] h-[35rem] bg-gradient-to-b from-blue-600/20 via-indigo-500/10 to-transparent rounded-full filter blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-purple-600/10 rounded-full filter blur-[140px]" />
      </div>

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              KIAN<span className="text-blue-500 font-normal">AgentNet</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-md shadow-blue-600/20 font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-20 flex flex-col items-center text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-md">
          <Sparkles size={14} className="animate-pulse" />
          <span>Next-Gen AI Agent Gateway v1.0</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.1] mb-6">
          The High-Performance Gateway for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            Autonomous AI Agents
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-normal">
          Manage API authentication, extract structured web intelligence, and orchestrate agent networks with cryptographic security and real-time token tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-600/25 group"
          >
            <span>Start Building Free</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-md"
          >
            <Terminal size={18} className="text-gray-400" />
            <span>Developer Console</span>
          </Link>
        </div>

        {/* Hero Interactive Terminal Graphic */}
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0d111a]/90 backdrop-blur-2xl shadow-2xl overflow-hidden text-left relative group">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full filter blur-3xl pointer-events-none group-hover:bg-blue-500/30 transition-all" />
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-gray-400 font-mono ml-2">agentnet-protocol-stream.ts</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              CONNECTED [200 OK]
            </div>
          </div>

          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300 space-y-3">
            <div className="flex items-center gap-2 text-gray-500">
              <span>{"// Authenticating Agent Key with Kian Core"}</span>
            </div>
            <div className="text-blue-400">
              <span className="text-purple-400">const</span> agent = <span className="text-purple-400">new</span> KianAgentNet(&#123; apiKey: <span className="text-emerald-300">&quot;sk_kian_99f28a7c...&quot;</span> &#125;);
            </div>
            <div className="text-gray-300">
              <span className="text-purple-400">const</span> session = <span className="text-purple-400">await</span> agent.extract(&#123; target: <span className="text-emerald-300">&quot;https://api.kian.net/data&quot;</span> &#125;);
            </div>
            <div className="p-4 rounded-xl bg-[#080a0f] border border-white/5 text-xs text-emerald-400 mt-4 space-y-1">
              <p>&#123;</p>
              <p className="pl-4">&quot;status&quot;: &quot;success&quot;,</p>
              <p className="pl-4">&quot;latency_ms&quot;: 142,</p>
              <p className="pl-4">&quot;tokens_remaining&quot;: 49850,</p>
              <p className="pl-4">&quot;payload&quot;: &#123; &quot;agent_id&quot;: &quot;ag_009&quot;, &quot;state&quot;: &quot;verified&quot; &#125;</p>
              <p>&#125;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Built for Scale & Security</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to deploy, protect, and track AI interactions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Cryptographic Keys</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Issue instantly revocable API keys encrypted at rest. Isolated workspace permissions ensure zero data leakage.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Telemetry</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Monitor extraction throughput, success ratios, and exact token consumption directly from your developer dashboard.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Sub-Second Latency</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Optimized HTTP proxy nodes built on global Edge networks ensure instant responses for your autonomous pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about the platform and integration.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="font-semibold text-lg text-gray-200">{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-400' : ''}`} 
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Complete Structural Footer */}
      <footer className="border-t border-white/10 bg-[#05070a] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Brand Column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Zap size={16} className="text-white fill-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                  KIAN<span className="text-blue-500 font-normal">AgentNet</span>
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                High-performance developer infrastructure for autonomous AI agents, API authentication, and web data extraction.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pricing" className="hover:text-white transition">Pricing Plans</Link></li>
                <li><Link href="/playground" className="hover:text-white transition">API Playground</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Developer Console</Link></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-white transition">Create Account</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Kian AgentNet Infrastructure. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}