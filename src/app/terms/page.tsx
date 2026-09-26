import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30">
      <div className="max-w-3xl mx-auto px-6 py-24">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <FileText size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Terms of Service</h1>
        </div>
        
        <p className="text-blue-400 mb-12 font-medium">Last updated: October 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Kian AgentNet API and platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. API Usage & Fair Play</h2>
            <p className="mb-4">Our gateway is designed for high-performance AI extraction. However, users must adhere to our fair use policy:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Do not use the API for illegal, harmful, or malicious scraping activities.</li>
              <li>Respect rate limits corresponding to your current subscription tier.</li>
              <li>You are responsible for ensuring you have the right to extract data from the target URLs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Service Availability (SLA)</h2>
            <p>While we strive for 99.9% uptime, Kian AgentNet is provided on an "as is" and "as available" basis. We are not liable for any downtime caused by third-party LLM providers (e.g., Google Gemini outages) or underlying infrastructure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Account Termination</h2>
            <p>We reserve the right to suspend or terminate API access immediately without notice if we detect abuse, violation of target websites' terms, or non-payment of subscription fees.</p>
          </section>
        </div>
      </div>
    </div>
  );
}