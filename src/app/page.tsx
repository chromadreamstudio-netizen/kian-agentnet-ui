'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Zap, ArrowRight, Terminal, Shield, Cpu, Activity, 
  ChevronDown, Command
} from "lucide-react";

export default function RaycastStyleLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does Kian AgentNet handle authentication?",
      a: "AgentNet uses high-entropy cryptographic API keys (`sk_kian_...`) attached to your headers. Every request is verified via Edge infrastructure in real-time."
    },
    {
      q: "What happens when I exhaust my free credits?",
      a: "On the Free Tier, you receive 100 API credits. Upgrade to Pro via Lemon Squeezy to unlock 50,000 monthly credits and unthrottled bandwidth."
    },
    {
      q: "Can I integrate Kian AgentNet with Python and Next.js?",
      a: "Yes! AgentNet exposes standard REST endpoints compatible with standard HTTP client libraries in Python, TypeScript, Node.js, and cURL."
    }
  ];

  return (
    <div className="min-h-screen bg-[#040506] text-white font-sans selection:bg-[#ff6363]/30 overflow-x-hidden">
      
      {/* Raycast Dramatic Hero Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-gradient-to-b from-[#ff6363]/15 via-[#143ca3]/20 to-transparent rounded-full filter blur-[120px]" />
      </div>

      {/* Floating Glass Navigation Bar */}
      <div className="sticky top-6 z-50 px-4 max-w-5xl mx-auto">
        <nav className="border border-[#363739] bg-[#040506]/70 backdrop-blur-2xl rounded-full px-6 h-12 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Coral Diamond Raycast Logo Mark */}
            <div className="w-5 h-5 bg-[#ff6363] rotate-45 flex items-center justify-center rounded-[2px] shadow-sm shadow-[#ff6363]/50">
              <div className="w-2 h-2 bg-[#040506] -rotate-45" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white ml-1">
              KIAN <span className="text-[#9c9c9d] font-normal">AgentNet</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs text-[#9c9c9d] font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs text-[#9c9c9d] hover:text-white transition-colors font-medium">
              Log In
            </Link>
            {/* Raycast Neutral Filled Action Button */}
            <Link 
              href="/signup" 
              className="text-xs px-3 py-1.5 bg-[#e6e6e6] hover:bg-white text-[#454647] font-semibold rounded-md transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1b1c1e] border border-[#363739] text-[#9c9c9d] text-xs font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-[#ff6363] animate-pulse" />
          <span>v1.04.21 · Edge Gateway Protocol</span>
        </div>

        {/* 56px Inter 400 Headline (Raycast Anti-Convention Signature) */}
        <h1 className="text-4xl md:text-[56px] font-normal tracking-[0.22px] leading-[1.17] max-w-3xl mb-6 text-white">
          Your shortcut to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e6e6e6] to-[#9c9c9d]">
            autonomous AI agents.
          </span>
        </h1>

        <p className="text-base text-[#9c9c9d] max-w-xl mb-10 leading-relaxed font-normal">
          Manage API authentication, extract structured web data, and deploy cryptographic agent workflows in seconds.
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <Link 
            href="/signup" 
            className="flex items-center gap-2 px-5 py-2.5 bg-[#e6e6e6] hover:bg-white text-[#454647] rounded-lg text-sm font-medium transition-all shadow-md"
          >
            <span>Download Console</span>
            <ArrowRight size={15} />
          </Link>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 px-5 py-2.5 bg-[#07080a] border border-[#363739] text-white hover:border-[#6a6b6c] rounded-lg text-sm font-medium transition-all raycast-key-shadow"
          >
            <Command size={15} className="text-[#9c9c9d]" />
            <span>Open Playground</span>
          </Link>
        </div>

        {/* Technical Micro-Metadata Line (Geist Mono) */}
        <div className="font-mono text-xs text-[#6a6b6c] flex items-center gap-2 mb-16">
          <span>v1.104.21</span>
          <span>|</span>
          <span>macOS 13+ / Linux</span>
          <span>|</span>
          <span className="text-[#9c9c9d]">curl -sSL https://kian.net/install</span>
        </div>

        {/* Tactile App Window Container */}
        <div className="w-full max-w-4xl rounded-2xl raycast-card border border-[#363739] p-2 text-left relative overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#363739]/50 bg-[#040506]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1b1c1e] border border-[#363739]" />
              <div className="w-3 h-3 rounded-full bg-[#1b1c1e] border border-[#363739]" />
              <div className="w-3 h-3 rounded-full bg-[#1b1c1e] border border-[#363739]" />
              <span className="text-xs font-mono text-[#6a6b6c] ml-2">agentnet-session</span>
            </div>
            <span className="text-xs font-mono text-[#ff6363]">● ACTIVE</span>
          </div>

          <div className="p-6 font-mono text-xs leading-relaxed text-[#9c9c9d] space-y-2 bg-[#07080a]">
            <div><span className="text-[#ff6363]">$</span> agentnet init --key <span className="text-white">&quot;sk_kian_99f28a...&quot;</span></div>
            <div className="text-[#6a6b6c]">// Connecting to Edge Nodes...</div>
            <div className="p-3 rounded-lg bg-[#111214] border border-[#363739] text-[#e6e6e6]">
              &#123; &quot;status&quot;: 200, &quot;gateway&quot;: &quot;kian-edge-01&quot;, &quot;latency&quot;: &quot;12ms&quot; &#125;
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20 border-t border-[#363739]">
        <div className="mb-12">
          <h2 className="text-2xl font-normal text-white mb-2">Built for Performance</h2>
          <p className="text-sm text-[#9c9c9d]">Engineered with hairline precision and zero overhead.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl raycast-card hover:border-[#6a6b6c] transition-all">
            <div className="w-10 h-10 rounded-full bg-[#1b1c1e] flex items-center justify-center text-white mb-4">
              <Shield size={18} />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Cryptographic Keys</h3>
            <p className="text-xs text-[#9c9c9d] leading-relaxed">
              High-entropy API keys encrypted at rest with workspace isolation.
            </p>
          </div>

          <div className="p-6 rounded-2xl raycast-card hover:border-[#6a6b6c] transition-all">
            <div className="w-10 h-10 rounded-full bg-[#1b1c1e] flex items-center justify-center text-[#ff6363] mb-4">
              <Activity size={18} />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Real-Time Telemetry</h3>
            <p className="text-xs text-[#9c9c9d] leading-relaxed">
              Track throughput and exact token consumption from your dashboard.
            </p>
          </div>

          <div className="p-6 rounded-2xl raycast-card hover:border-[#6a6b6c] transition-all">
            <div className="w-10 h-10 rounded-full bg-[#1b1c1e] flex items-center justify-center text-white mb-4">
              <Cpu size={18} />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Edge Proxy</h3>
            <p className="text-xs text-[#9c9c9d] leading-relaxed">
              Sub-second response times powered by distributed global nodes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20 border-t border-[#363739]">
        <h2 className="text-2xl font-normal text-white mb-8 text-center">Questions & Answers</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-[#07080a] border border-[#363739] overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex justify-between items-center text-sm font-medium text-white focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown size={16} className={`text-[#6a6b6c] transition-transform ${openFaq === idx ? 'rotate-180 text-white' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-[#9c9c9d] leading-relaxed border-t border-[#363739]/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer with All Legal Pages */}
      <footer className="border-t border-[#363739] bg-[#040506] pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#363739]">
            
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ff6363] rotate-45 rounded-[2px]" />
                <span className="font-semibold text-sm text-white">KIAN AgentNet</span>
              </div>
              <p className="text-xs text-[#6a6b6c] leading-relaxed">
                Developer infrastructure for autonomous AI agents.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold text-[#9c9c9d] uppercase mb-3 tracking-wider">Product</h4>
              <ul className="space-y-2 text-xs text-[#6a6b6c]">
                <li><Link href="/pricing" className="hover:text-white transition">Pricing Plans</Link></li>
                <li><Link href="/playground" className="hover:text-white transition">Playground</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Console</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold text-[#9c9c9d] uppercase mb-3 tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs text-[#6a6b6c]">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-white transition">Create Account</Link></li>
              </ul>
            </div>

            {/* Legal Pages */}
            <div>
              <h4 className="text-xs font-semibold text-[#9c9c9d] uppercase mb-3 tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs text-[#6a6b6c]">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#6a6b6c]">
            <p>&copy; {new Date().getFullYear()} Kian AgentNet, Inc.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6363]"></span>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}