import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30">
      <div className="max-w-3xl mx-auto px-6 py-24">
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-kian-brand/20 flex items-center justify-center text-kian-brand">
            <Shield size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
        </div>
        
        <p className="text-kian-glow mb-12 font-medium">Last updated: October 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection & Usage</h2>
            <p className="mb-4">
              At Kian AgentNet, we are committed to protecting your privacy. We collect minimal data necessary to provide our API services. The data extracted through our gateway is processed in real-time and is <strong>never stored</strong> permanently on our servers unless explicitly requested via specific caching configurations.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Account details (email, billing information)</li>
              <li>API usage logs (request frequency, error rates, payload sizes)</li>
              <li>Extraction schemas configurations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Processing Engine</h2>
            <p>
              Our extraction engine utilizes advanced LLMs (including Google Gemini). When you submit a URL for extraction, the target HTML content is processed securely. We do not use your proprietary schemas or extracted data to train our foundational models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
            <p>
              We use standard third-party infrastructure to power our platform:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 mt-4">
              <li><strong>Authentication & Database:</strong> Supabase</li>
              <li><strong>Payments:</strong> Lemon Squeezy</li>
              <li><strong>Hosting:</strong> Vercel</li>
            </ul>
            <p className="mt-4">
              These providers are bound by strict data processing agreements and only access data required to perform their specific functions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
            <p>
              You have the right to access, modify, or delete your personal information at any time. You can manage your data directly from your dashboard or contact our support team to request a complete data wipe of your account and associated API keys.
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@kian-agentnet.com" className="text-kian-brand hover:underline">privacy@kian-agentnet.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}