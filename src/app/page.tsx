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
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Lock
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // التحقق من حالة تسجيل الدخول (يمكن ربطها لاحقاً بـ Supabase)
    const checkAuthStatus = () => {
      // هنا نتحقق من وجود جلسة (Session) وهمية مؤقتاً
      // في المستقبل، سيتم استبدال هذا بفحص التوكن الخاص بـ Supabase
      const hasSession = localStorage.getItem("kian_session") === "true";
      setIsLoggedIn(hasSession);
    };
    
    checkAuthStatus();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // دالة ذكية للتعامل مع الروابط المحمية (مثل Playground)
  const handleProtectedAction = (path: string) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
      // إذا لم يكن مسجلاً، وجهه لصفحة التسجيل مع تنبيه أو تخزين مسار العودة
      router.push('/signup');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kian_session");
    // مسح الكوكيز إن وجدت
    document.cookie = "kian-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setIsLoggedIn(false);
    router.push('/');
  };

  const handleLoginDemo = () => {
    // دالة مؤقتة لتجربة الدخول (اربطها لاحقاً بصفحة الدخول الحقيقية)
    router.push('/login');
  };

  const faqs = [
    {
      q: "What exactly does Kian AgentNet do?",
      a: "Kian AgentNet is a powerful API gateway designed specifically for AI Agents. It transforms any unstructured web page into strict, predictable JSON data. Instead of writing brittle web scraping scripts that break when a website's UI changes, our platform uses advanced Vision & Semantic LLMs to 'read' the page like a human and extract exactly what your agent needs."
    },
    {
      q: "Can it handle dynamic websites heavily reliant on JavaScript?",
      a: "Absolutely. Our infrastructure includes a built-in headless browser layer that fully renders JavaScript, intercepts dynamic network requests, and waits for single-page applications (SPAs) to load before performing the extraction. You get the data, no matter how complex the frontend is."
    },
    {
      q: "How does this compare to traditional Web Scraping tools?",
      a: "Traditional scrapers rely on CSS selectors and DOM parsing, meaning the moment a website updates its design, your pipeline breaks (Zero Maintenance). Kian AgentNet is 'anti-fragile'. By relying on AI comprehension rather than static selectors, your automated workflows will continue functioning seamlessly regardless of underlying HTML changes."
    },
    {
      q: "How reliable is the JSON output for production environments?",
      a: "Highly reliable. We utilize strict schema enforcement techniques. You provide the JSON structure your application expects, and our engine guarantees the output will match that exact format and data type, passing rigorous validation before the API response is sent back to your servers."
    },
    {
      q: "Does the system support Arabic and multilingual extraction?",
      a: "Yes. Our engine natively understands and processes all major languages, including right-to-left languages like Arabic, with exceptional accuracy. Furthermore, our Pro and Scale tiers support 'On-the-fly Translation', allowing you to extract data from a Chinese supplier website directly into English or Arabic JSON."
    }
  ];

  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30 overflow-x-hidden">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-kian-brand/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-kian-accent/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kian-900/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
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
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <a href="mailto:hello@kian-agentnet.com" className="hover:text-white transition-colors">Contact</a>
            
            <div className="w-px h-4 bg-gray-700"></div>
            
            {/* زر الـ Playground معتمد على حالة التسجيل */}
            <button 
              onClick={() => handleProtectedAction('/playground')} 
              className="flex items-center gap-2 text-kian-glow hover:text-white transition-colors"
            >
              {!isLoggedIn && <Lock size={12} className="opacity-50" />}
              <Sparkles size={14} /> Playground
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              // هيدر المستخدم المسجل الدخول
              <>
                <Link href="/dashboard" className="text-sm font-medium px-4 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 transition-all flex items-center gap-2">
                  <LogOut size={16} /> Log Out
                </button>
              </>
            ) : (
              // هيدر الزائر الجديد
              <>
                <button onClick={handleLoginDemo} className="text-sm font-medium px-4 py-2 text-gray-300 hover:text-white transition-colors">
                  Sign In
                </button>
                <button onClick={() => router.push('/signup')} className="text-sm font-medium px-4 py-2 text-kian-glow hover:text-white transition-colors border border-kian-brand/30 rounded-lg bg-kian-brand/10">
                  Sign Up
                </button>
                <button onClick={() => router.push('/signup')} className="relative group overflow-hidden text-sm font-medium px-5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <span className="relative z-10 flex items-center gap-2">Get API Key <ArrowRight size={16} /></span>
                </button>
              </>
            )}
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
                onClick={() => isLoggedIn ? router.push('/dashboard') : router.push('/signup')}
                className="px-8 py-4 rounded-xl bg-kian-brand hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-kian-brand/25 hover:shadow-kian-brand/40 flex items-center justify-center gap-2"
              >
                {isLoggedIn ? 'Go to Dashboard' : 'Start Building Free'}
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => handleProtectedAction('/playground')} 
                className="px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Terminal size={18} /> View Playground
              </button>
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

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 mb-4">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about integrating Kian AgentNet.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-kian-800/30 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Ready to scale your AI extraction?</p>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all">
              View Pricing Plans <ArrowRight size={18} />
            </Link>
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
              <li>
                <button onClick={() => handleProtectedAction('/playground')} className="hover:text-white transition-colors">Playground</button>
              </li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
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