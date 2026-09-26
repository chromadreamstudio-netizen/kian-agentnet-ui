import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30">
      <div className="max-w-3xl mx-auto px-6 py-24">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <RefreshCcw size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Refund Policy</h1>
        </div>
        
        <p className="text-purple-400 mb-12 font-medium">Last updated: October 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Digital API Credits</h2>
            <p>Due to the nature of compute-heavy LLM API services, all purchases of Pro Tier subscriptions and API credits are generally non-refundable once the credits have been utilized.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. 7-Day Consideration Period</h2>
            <p>If you upgrade to a paid tier but realize the platform does not fit your technical requirements, you may request a full refund within 7 days of purchase, provided that you have used less than 500 API credits during that time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Accidental Upgrades</h2>
            <p>If you accidentally upgraded your account or forgot to cancel before the billing cycle renewed, contact us within 48 hours of the charge. We will refund the latest charge if zero API calls were made in the new billing cycle.</p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Requesting a Refund</h2>
            <p>To initiate a refund request, please email your account details and transaction ID to <a href="mailto:billing@kian-agentnet.com" className="text-kian-brand hover:underline">billing@kian-agentnet.com</a>. Processing typically takes 5-10 business days depending on your payment provider.</p>
          </section>
        </div>
      </div>
    </div>
  );
}