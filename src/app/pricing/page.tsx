"use client";

import Link from "next/link";
import { Check, Zap, ArrowLeft } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter (Free Tier)",
      price: "$0",
      description: "Ideal for testing and lightweight local development.",
      features: [
        "50 API Credits Included",
        "Standard Gateway Rate Limit",
        "Community Support",
        "Access to Protocol Playground"
      ],
      buttonText: "Current Plan",
      buttonStyle: "bg-zinc-800 text-zinc-400 cursor-default border border-zinc-700/50",
      href: "/dashboard"
    },
    {
      name: "Pro Tier",
      price: "$19.99",
      period: "/month",
      featured: true,
      description: "Built for high-volume automated scraping and agents.",
      features: [
        "10,000 API Credits / Mo",
        "High-Priority Edge Proxy Nodes",
        "Unlimited Playground Extractions",
        "Direct Email Support",
        "Cryptographic Signature Headers"
      ],
      buttonText: "Upgrade to Pro",
      buttonStyle: "bg-red-500 hover:bg-red-600 text-black shadow-lg shadow-red-500/20 font-bold",
      href: "https://kian-agentnet1.lemonsqueezy.com/checkout/buy/cc334133-ff5c-4eee-8fca-99e66a2a3c2c"
    },
    {
      name: "Scale Tier",
      price: "$99.99",
      period: "/month",
      description: "For custom enterprise workflows and high throughput.",
      features: [
        "100,000+ API Credits / Mo",
        "Dedicated Gateway Infra",
        "SLA & Priority Telemetry",
        "Custom DOM Parsing Schemas",
        "Dedicated Tech Account Manager"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50",
      href: "mailto:hello@kian-agentnet.com"
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-red-500/20 selection:text-red-200 overflow-x-hidden antialiased">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-red-500/5 via-zinc-900/0 to-transparent blur-3xl pointer-events-none -z-10" />

      <header className="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-black font-black text-xs tracking-tighter">K</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              KIAN <span className="text-zinc-400 font-normal">AgentNet</span>
            </span>
          </div>

          {/* التعديل هنا: تحويل الزر للعودة إلى الصفحة الرئيسية */}
          <Link 
            href="/" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-xs font-medium text-zinc-300 hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 mb-4">
            <Zap size={14} className="text-red-500" /> Transparent Protocol Pricing
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Simple, Credit-Based Pricing
          </h1>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Choose the plan that fits your execution volume. Scale seamlessly as your autonomous agents grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`rounded-2xl p-6 flex flex-col justify-between relative bg-[#0c0c0e] border transition-all ${
                plan.featured 
                  ? "border-red-500/50 shadow-2xl shadow-red-500/5 ring-1 ring-red-500/20" 
                  : "border-zinc-800/80 hover:border-zinc-700"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-red-500 text-black font-bold text-[10px] uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-xs text-zinc-500 font-mono">{plan.period}</span>}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <Check size={14} className="text-red-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href={plan.href}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold text-center transition-all block ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}