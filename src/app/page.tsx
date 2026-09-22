import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-50 font-sans selection:bg-blue-600 selection:text-white" dir="ltr">
      
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              KIAN<span className="text-blue-500 font-light">AgentNet</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              <Link href="#features" className="hover:text-white transition">Features</Link>
              <Link href="#services" className="hover:text-white transition">Services</Link>
              <Link href="/docs" className="hover:text-white transition">Documentation</Link>
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition">
              Log in
            </Link>
            {/* Dashboard Button */}
            <Link href="/dashboard" className="hidden md:flex bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600/20 px-5 py-2.5 rounded-lg text-sm font-semibold transition items-center gap-2">
               Dashboard ⚙️
            </Link>
            <Link href="/signup" className="bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm">
              Sign up for free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 blur-[100px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            V1.0 Beta is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-4xl mx-auto">
            The Enterprise-Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Data Extraction Engine
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Instantly transform unstructured text and documents into clean, structured JSON. Integrate the power of AI into your existing CRM, ERP, or custom software in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl transition text-base font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Get Your API Key
            </Link>
            {/* Updated Sandbox Link to redirect to Dashboard */}
            <Link href="/dashboard" className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-[#222] text-white px-8 py-3.5 rounded-xl border border-gray-800 transition text-base font-semibold flex items-center justify-center gap-2">
              Go to Dashboard <span className="text-xl">🚀</span>
            </Link>
          </div>
        </div>
      </main>

      {/* API Preview Section for Developers */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-[#111] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-gray-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-gray-500">POST /v1/extract</div>
          </div>
          <div className="p-6 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
            <p><span className="text-purple-400">const</span> response = <span className="text-blue-400">await</span> fetch(<span className="text-green-400">&apos;https://api.kian-agentnet.com/v1/extract&apos;</span>, {'{'}</p>
            <p className="pl-4">method: <span className="text-green-400">&apos;POST&apos;</span>,</p>
            <p className="pl-4">headers: {'{'}</p>
            <p className="pl-8"><span className="text-green-400">&apos;Authorization&apos;</span>: <span className="text-green-400">&apos;Bearer YOUR_API_KEY&apos;</span>,</p>
            <p className="pl-8"><span className="text-green-400">&apos;Content-Type&apos;</span>: <span className="text-green-400">&apos;application/json&apos;</span></p>
            <p className="pl-4">{'}'},</p>
            <p className="pl-4">body: JSON.<span className="text-blue-400">stringify</span>({'{'}</p>
            <p className="pl-8">text: <span className="text-green-400">&quot;Waleed is a CTO with 20 years of experience in enterprise software.&quot;</span>,</p>
            <p className="pl-8">schema: <span className="text-green-400">&quot;name, role, experience_years, domain&quot;</span></p>
            <p className="pl-4">{'}'})</p>
            <p>{'}'});</p>
          </div>
        </div>
      </section>

      {/* Services & Features */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-900 mt-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for Scale</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to automate data extraction without managing complex LLM infrastructure.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-blue-400 text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Ultra-Fast Processing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Built on edge architecture to ensure low-latency responses, perfect for real-time application integration.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-purple-400 text-xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Dynamic Schemas</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Define exactly what data you want back. Our engine adapts to your required JSON structure flawlessly.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition">
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center mb-6">
              <span className="text-green-400 text-xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Your data is never used for training. We prioritize privacy with secure token management and encryption.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-[#0a0a0a] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-xl font-black tracking-tighter mb-4">
              KIAN<span className="text-gray-500 font-light">AgentNet</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Empowering businesses to extract and structure data seamlessly with advanced AI APIs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white transition">API Documentation</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
          <p>© 2026 Kian Solutions. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
             Designed for Enterprise Developers.
          </div>
        </div>
      </footer>
    </div>
  );
}