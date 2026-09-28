import Link from "next/link";
import { Zap, ArrowRight, Terminal, Shield, Cpu } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30 overflow-x-hidden">
      
      {/* تأثيرات الإضاءة الخلفية (نفس المستخدمة في الداشبورد) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-kian-brand/20 rounded-full mix-blend-screen filter blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-kian-accent/10 rounded-full mix-blend-screen filter blur-[120px]" />
      </div>

      {/* شريط التنقل (Navbar) */}
      <nav className="border-b border-white/5 bg-kian-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-kian-brand to-kian-accent flex items-center justify-center shadow-lg shadow-kian-brand/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Kian AgentNet</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors font-medium">
              Log In
            </Link>
            <Link href="/signup" className="text-sm px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/5 font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* القسم الرئيسي (Hero Section) */}
      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        
        {/* شارة التحديث */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kian-brand/10 border border-kian-brand/30 text-kian-brand text-xs font-bold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kian-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-kian-brand"></span>
          </span>
          AgentNet Gateway v1.0 is Live
        </div>
        
        {/* العنوان الرئيسي */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          The Infrastructure for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-kian-brand to-blue-400">
            Intelligent Agents
          </span>
        </h1>
        
        {/* الوصف */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Scale your AI operations with Kian AgentNet. Get secure API keys, monitor your token usage, and integrate seamless data extractions in minutes.
        </p>
        
        {/* أزرار الإجراءات (CTAs) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-kian-brand hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-kian-brand/25"
          >
            Start Building Free <ArrowRight size={18} />
          </Link>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all"
          >
            <Terminal size={18} className="text-gray-400" />
            Go to Dashboard
          </Link>
        </div>

        {/* مميزات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full text-left">
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <Shield className="text-emerald-400 mb-4" size={24} />
            <h3 className="text-lg font-bold text-white mb-2">Secure API Keys</h3>
            <p className="text-sm text-gray-400">Generate and manage cryptographic keys to authenticate your agent requests securely.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <Zap className="text-kian-brand mb-4" size={24} />
            <h3 className="text-lg font-bold text-white mb-2">Real-time Metrics</h3>
            <p className="text-sm text-gray-400">Monitor your credit usage and extraction success rates directly from your dashboard.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <Cpu className="text-purple-400 mb-4" size={24} />
            <h3 className="text-lg font-bold text-white mb-2">High Performance</h3>
            <p className="text-sm text-gray-400">Built on Edge infrastructure to ensure sub-second latency for all your AI operations.</p>
          </div>
        </div>

      </main>
    </div>
  );
}