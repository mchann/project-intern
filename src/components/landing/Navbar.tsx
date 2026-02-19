import Link from "next/link";

export default function Navbar({ session }: { session: any }) {
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 h-20 sticky top-0 bg-white/60 backdrop-blur-xl z-50 border-b border-white/80 shadow-sm">
      <h1 className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-1">
        Muda<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pedia</span>
      </h1>
      <div className="flex items-center gap-4">
        {session ? (
          <Link href="/dashboard" className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-md">
            Dashboard Saya
          </Link>
        ) : (
          <Link href="/login" className="bg-white border border-gray-200 text-gray-900 px-6 py-2 rounded-full font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
}