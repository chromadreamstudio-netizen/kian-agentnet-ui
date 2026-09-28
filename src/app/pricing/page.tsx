'use client';

import Link from 'next/link';
import { Check, Zap, Server, Shield, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
      
      {/* Navigation Bar */}
      <nav className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Kian
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log In</Link>
            <Link href="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Simple, transparent pricing for <span className="text-blue-500">developers.</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          From hobby projects to enterprise-grade web automation. Scale your data extraction without building the infrastructure.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Starter Plan */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 flex flex-col relative hover:border-gray-700 transition-colors">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Starter</h2>
            <p className="text-gray-400 text-sm h-10">Perfect for testing the API and personal projects.</p>
          </div>
          <div className="mb-6">
            <span className="text-5xl font-extrabold">$0</span>
            <span className="text-gray-500"> /month</span>
          </div>
          <Link href="/signup" className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl text-center mb-8 transition-colors">
            Start for Free
          </Link>
          <ul className="space-y-4 flex-1">
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-gray-500 shrink-0" /> 50 API Credits / month</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-gray-500 shrink-0" /> Standard JSON Extraction</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-gray-500 shrink-0" /> 1 Request / second limit</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-gray-500 shrink-0" /> Email Support</li>
          </ul>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div className="bg-gradient-to-b from-blue-900/20 to-[#111] border border-blue-500/50 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Most Popular
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-white">Pro Tier</h2>
            <p className="text-gray-400 text-sm h-10">For startups and active automation workflows.</p>
          </div>
          <div className="mb-6">
            <span className="text-5xl font-extrabold">$19<span className="text-2xl">.99</span></span>
            <span className="text-gray-500"> /month</span>
          </div>
          <a 
            href="https://kian-agentnet1.lemonsqueezy.com/checkout/buy/5a748b53-e93b-4631-bb4c-3d3d7c6abe84" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-center mb-8 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            Upgrade to Pro <ArrowRight size={18} />
          </a>
          <ul className="space-y-4 flex-1">
            <li className="flex gap-3 text-white font-medium text-sm"><Check size={20} className="text-blue-500 shrink-0" /> 10,000 API Credits / month</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-blue-500 shrink-0" /> Custom JSON Schemas</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-blue-500 shrink-0" /> On-the-fly Translation</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-blue-500 shrink-0" /> 5 Requests / second limit</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-blue-500 shrink-0" /> Standard Webhook Notifications</li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 flex flex-col relative hover:border-gray-700 transition-colors">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Scale</h2>
            <p className="text-gray-400 text-sm h-10">For serious data operations and high-volume limits.</p>
          </div>
          <div className="mb-6">
            <span className="text-5xl font-extrabold">$79<span className="text-2xl">.99</span></span>
            <span className="text-gray-500"> /month</span>
          </div>
          <a 
            href="https://kian-agentnet1.lemonsqueezy.com/checkout/buy/6a2d3e58-821d-4863-bd7e-a65e695b5d3d" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl text-center mb-8 transition-colors block"
          >
            Get Scale
          </a>
          <ul className="space-y-4 flex-1">
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-gray-500 shrink-0" /> 50,000 API Credits / month</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Shield size={20} className="text-emerald-500 shrink-0" /> Anti-Bot & JS Rendering Engine</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Server size={20} className="text-emerald-500 shrink-0" /> Batch URL Processing</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Zap size={20} className="text-emerald-500 shrink-0" /> Scheduled Automated Tracker</li>
            <li className="flex gap-3 text-gray-300 text-sm"><Check size={20} className="text-gray-500 shrink-0" /> Priority Support</li>
          </ul>
        </div>

      </div>
    </div>
  );
}