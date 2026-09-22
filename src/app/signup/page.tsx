import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Sign Up Page</h1>
      <p className="text-gray-400">Supabase Authentication integration in progress...</p>
      <Link href="/" className="text-blue-500 hover:underline mt-4">← Back to Home</Link>
    </div>
  );
}