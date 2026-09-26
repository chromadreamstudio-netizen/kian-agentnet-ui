"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Zap, 
  Terminal, 
  Shield, 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  Menu,
  X,
  Globe,
  Database,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthNavigation = (path: string) => {
    document.cookie = "kian-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30 overflow-x-hidden">
      
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-kian-brand/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-kian-accent/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kian-900/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kian-brand to-kian-accent flex items-center justify-center shadow-lg shadow-kian-brand/20 group-hover:shadow-kian-brand/40 transition-all duration-300">
              <Zap size={22} className="text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Kian
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <a href="mailto:hello@kian-agentnet.com" className="hover:text-white transition-colors">Contact</a>
            <div className="w-px h-4 bg-gray-700"></div>
            <Link href="/playground" className="flex items-center gap-2 text-kian-glow hover:text-white transition-colors">
              <Sparkles size={14} /> Playground
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => handleAuthNavigation('/login')} className="text-sm font-medium px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={() => handleAuthNavigation('/signup')} className="text-sm font-medium px-4 py-2 text-kian-glow hover:text-white transition-colors border border-kian-brand/30 rounded-lg bg-kian-brand/10">
              Sign Up
            </button>
            <button onClick={() => handleAuthNavigation('/signup')} className="relative group overflow-hidden text-sm font-medium px-5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-all">
              <span className="relative z-10 flex items-center gap-2">Get API Key <ArrowRight size={16} /></span>
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-400 hover:text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-kian-brand/30 bg-kian-brand/10 text-kian-glow text-xs font-semibold mb-6">
              <Shield size={14} /> Enterprise-Grade Extraction Layer
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Don&apos;t Scrape. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kian-brand via-kian-glow to-kian-accent">
                Orchestrate Data.
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
              The ultimate web extraction gateway for autonomous AI agents. Convert messy HTML into strict JSON structures instantly, powered by advanced LLM processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleAuthNavigation('/signup')}
                className="px-8 py-4 rounded-xl bg-kian-brand hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-kian-brand/25 hover:shadow-kian-brand/40 flex items-center justify-center gap-2"
              >
                Start Building Free
                <ArrowRight size={18} />
              </button>
              <Link 
                href="/playground" 
                className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Terminal size={18} /> View Playground
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-kian-brand/20 to-kian-accent/20 rounded-2xl blur-2xl"></div>
            <div className="relative bg-kian-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-kian-900/50 px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs font-mono text-gray-500 flex-1 text-center">POST /v1/gateway/execute</div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="mb-4">
                  <span className="text-gray-500">{"// 1. The Agent's Request"}</span>
                  <div className="text-white mt-2">
                    <span className="text-pink-400">const</span> response = <span className="text-kian-glow">await</span> kian.<span className="text-blue-300">extract</span>({'{'}
                    <br/>&nbsp;&nbsp;url: <span className="text-green-400">&quot;https://example.com&quot;</span>,
                    <br/>&nbsp;&nbsp;schema: <span className="text-green-400">&quot;financial_data&quot;</span>
                    <br/>{'}'});
                  </div>
                </div>
                <div className="animate-pulse text-gray-500 mb-4">Processing via Gateway...</div>
                <div>
                  <span className="text-gray-500">{"// 2. Structured JSON Output"}</span>
                  <div className="text-kian-glow mt-2">
                    {'{'}
                    <br/>&nbsp;&nbsp;<span className="text-white">&quot;revenue&quot;</span>: <span className="text-purple-400">&quot;$2.4M&quot;</span>,
                    <br/>&nbsp;&nbsp;<span className="text-white">&quot;growth&quot;</span>: <span className="text-purple-400">&quot;15%&quot;</span>,
                    <br/>&nbsp;&nbsp;<span className="text-white">&quot;confidence_score&quot;</span>: <span className="text-orange-400">0.99</span>
                    <br/>{'}'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative border-t border-white/5 bg-kian-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Built for Autonomous AI Systems</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Eliminate fragile DOM parsing. We use state-of-the-art LLMs to read web pages visually and semantically, delivering guaranteed JSON schemas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu size={24} />,
                title: "Gemini 3.5 Powered",
                desc: "Leverages high-speed language models to accurately parse unstructured HTML into strict, predictable schemas.",
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              },
              {
                icon: <Database size={24} />,
                title: "Zero Maintenance",
                desc: "When websites change their layout, our AI adapts instantly. Say goodbye to broken CSS selectors and regex.",
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              {
                icon: <Globe size={24} />,
                title: "Multilingual Engine",
                desc: "Seamlessly handles Arabic, English, and international character encoding out of the box with zero configuration.",
                color: "text-emerald-400",
                bg: "bg-emerald-400/10"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-kian-800/50 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start prototyping for free. Upgrade when your AI agents need to scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-kian-800/30 p-8 rounded-3xl border border-white/5 flex flex-col"
            >
              <div className="mb-8">
                <span className="text-kian-glow text-sm font-semibold tracking-wider uppercase">Hobby</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-gray-400">/ forever</span>
                </div>
                <p className="mt-4 text-gray-400 text-sm">Perfect for testing and small agent deployments.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["100 Free API Credits", "Interactive Protocol Playground", "Community Support", "Standard Rate Limits"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-kian-glow" /> {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleAuthNavigation('/signup')} className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">
                Start Free Trial
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-kian-brand/10 to-transparent p-8 rounded-3xl border border-kian-brand/30 relative flex flex-col"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-kian-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <div className="mb-8">
                <span className="text-kian-brand text-sm font-semibold tracking-wider uppercase">Pro Tier</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">$19</span>
                  <span className="text-gray-400">/ month</span>
                </div>
                <p className="mt-4 text-gray-400 text-sm">For production-grade AI agents requiring high volume.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["50,000 API Credits / Month", "Priority Gateway Routing", "Fast Extraction Speed", "24/7 Priority Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-kian-brand" /> {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleAuthNavigation('/dashboard')} className="w-full py-3 rounded-xl bg-kian-brand hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-kian-brand/20">
                Upgrade to Pro
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-kian-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-kian-brand" />
              <span className="font-bold text-xl text-white">Kian AgentNet</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering the next generation of autonomous AI agents with clean, structured, and reliable data extraction.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/playground" className="hover:text-white transition-colors">Playground</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="mailto:hello@kian-agentnet.com" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter (X)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Kian Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Built with <Cpu size={14} className="text-kian-brand" /> for AI Developers
          </div>
        </div>
      </footer>
    </div>
  );
}