import Link from "next/link";
import { ArrowLeft, Users, Zap, Code } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-kian-900 text-white font-sans selection:bg-kian-brand/30">
      <div className="max-w-3xl mx-auto px-6 py-24">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">About Kian AgentNet</h1>
          <p className="text-xl text-gray-400">Bridging the gap between messy web data and intelligent AI agents.</p>
        </div>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-kian-brand" /> Our Mission
            </h2>
            <p>
              At Kian Solutions, we realized that autonomous AI agents spend too much time struggling with broken DOM selectors and messy HTML instead of actually reasoning and executing tasks. Our mission is to provide an enterprise-grade extraction layer that acts as a robust gateway for LLMs. We turn chaotic web environments into strict, reliable JSON architectures instantly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Code size={20} className="text-green-400" /> Built for Developers
            </h2>
            <p>
              Kian AgentNet is designed by engineers, for engineers. We stripped away the bloat of traditional scraping tools and focused on what matters: API speed, schema adherence, and zero-maintenance architecture. By leveraging the latest Gemini 3.5 models, we ensure that your automated workflows never break due to a UI update on a target website.
            </p>
          </section>

          <section className="bg-kian-800/50 border border-white/10 p-8 rounded-2xl mt-12">
            <h2 className="text-xl font-bold text-white mb-4">Connect With Us</h2>
            <p className="mb-6 text-sm text-gray-400">Whether you are building a startup or orchestrating enterprise data, we are here to support your infrastructure.</p>
            <div className="flex gap-4">
              <a href="mailto:hello@kian-agentnet.com" className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                hello@kian-agentnet.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}