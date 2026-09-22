import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500 selection:text-white" dir="rtl">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-gray-800/60 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-blue-400 to-indigo-500 tracking-tight">
          KIAN<span className="text-white font-light">AgentNet</span>
        </div>
        <div className="flex gap-3 md:gap-4 items-center">
          <Link href="/sandbox" className="hidden md:block text-gray-400 hover:text-white transition text-sm font-medium">
            تجربة الأداة
          </Link>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-lg transition text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] border border-blue-500/50">
            لوحة المطورين
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-800/50 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          V1.0 Beta - Enterprise Ready
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15] max-w-4xl">
          محرك استخراج البيانات <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-indigo-400 to-purple-500">
            الأكثر ذكاءً للشركات
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          قم بتحويل البيانات غير المهيكلة والمقالات إلى بيانات منظمة (JSON) بضغطة زر. استخدم الـ API الخاص بنا لربط قوة الذكاء الاصطناعي بأنظمتك ومشاريعك بثوانٍ.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md relative z-10">
          <Link href="/dashboard" className="bg-white text-gray-950 hover:bg-gray-100 px-8 py-3.5 rounded-xl transition text-base font-bold shadow-lg text-center">
            احصل على API Key
          </Link>
          <Link href="/sandbox" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3.5 rounded-xl border border-gray-700 transition text-base font-semibold shadow-lg text-center flex items-center justify-center gap-2">
            اختبار الأداة مجاناً 🚀
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24 relative z-10 text-right">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition group">
            <div className="text-blue-400 text-3xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-100">استخراج فوري وفائق الدقة</h3>
            <p className="text-gray-500 text-sm leading-relaxed">بنية تحتية مصممة للسرعة، قادرة على فهم النصوص المعقدة واستخراج ما تحتاجه بدقة متناهية.</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition group">
            <div className="text-purple-400 text-3xl mb-4 group-hover:scale-110 transition-transform">🔗</div>
            <h3 className="text-xl font-bold mb-3 text-gray-100">API جاهز للربط</h3>
            <p className="text-gray-500 text-sm leading-relaxed">تكامل سلس مع أنظمتك الحالية (CRM, ERP) مع توثيق برمجي واضح لدعم مطوريك.</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition group">
            <div className="text-green-400 text-3xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
            <h3 className="text-xl font-bold mb-3 text-gray-100">لوحة تحكم شفافة</h3>
            <p className="text-gray-500 text-sm leading-relaxed">تتبع استهلاك الرصيد (Tokens)، وإدارة مفاتيح الأمان الخاصة بك من مكان واحد بسهولة.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 mt-12 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 Kian Solutions. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}