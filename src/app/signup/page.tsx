"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // التسجيل بالإيميل والباسورد
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      document.cookie = "kian-session=true; path=/; max-age=86400;";
      router.push("/dashboard");
    }
  };

  // التسجيل بحساب جوجل
  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // ملاحظة: مع Google OAuth، سيقوم Supabase بتوجيه المستخدم لصفحة جوجل ثم إعادته إلى /dashboard
    // الكوكي سيزرع تلقائياً بناءً على إعدادات الـ Middleware أو صفحة الداشبورد.
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
      
      {/* Brand */}
      <Link href="/" className="mb-8 font-bold text-2xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
        Kian AgentNet
      </Link>

      <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-center">Create your Account</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Start testing with 1,000 free API credits.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Google Sign Up Button */}
        <button 
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full mb-6 flex items-center justify-center gap-3 py-3 bg-[#ffffff] hover:bg-gray-100 text-black font-medium rounded-lg transition-colors text-sm disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-800 flex-1"></div>
          <span className="text-xs text-gray-500 uppercase">Or sign up with email</span>
          <div className="h-px bg-gray-800 flex-1"></div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="developer@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up with Email"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}