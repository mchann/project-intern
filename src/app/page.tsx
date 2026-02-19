import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, GraduationCap, MoonStar, StarIcon } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";


import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";;

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  await dbConnect();
  const internCount = await User.countDocuments({ role: "INTERN" });
  const mentorCount = await User.countDocuments({ role: "MENTOR" });

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans selection:bg-blue-200 selection:text-blue-900 relative overflow-hidden">
      
      {/* glow2 dkit */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-100/50 to-transparent blur-3xl -z-10 pointer-events-none rounded-b-full opacity-80" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200/40 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 -left-32 w-72 h-72 bg-cyan-200/40 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* komp nav */}
      <Navbar session={session} />

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm text-blue-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-10 hover:scale-105 transition-transform cursor-default">
          <StarIcon className="w-4 h-4 text-blue-500 animate-pulse" /> Platform Internship Modern
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.05] tracking-tight mb-8">
          Muda Pedia Digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
            Internship.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Platform modern bagi intern untuk melaporkan progres harian dan mentor memvalidasi kegiatan secara <span className="text-gray-900 font-bold border-b-2 border-blue-200">real-time</span>. Tanpa ribet, serba otomatis.
        </p>

        {/* Stats k */}
        <div className="inline-flex flex-wrap justify-center gap-4 mb-16 p-2 bg-white/50 backdrop-blur-xl border border-white rounded-3xl shadow-xl shadow-blue-900/5">
          <div className="bg-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-gray-900">{internCount}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Intern Aktif</p>
            </div>
          </div>

          <div className="bg-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-gray-900">{mentorCount}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mentor Ahli</p>
            </div>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          {session ? (
            <div className="bg-white p-2 rounded-full border border-gray-200 shadow-lg flex items-center gap-4 pl-6 w-full sm:w-auto">
              <p className="text-gray-600 font-medium text-sm">
                Hai, <span className="text-gray-900 font-black">{session.user?.name}</span>
              </p>
              <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition-all">
                Buka Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 transition-all w-full sm:w-auto group">
                Mulai Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="text-gray-600 font-bold hover:text-gray-900 bg-white/80 backdrop-blur-md border border-gray-200 hover:border-gray-400 transition-all px-8 py-4 rounded-full w-full sm:w-auto">
                Lihat Demo
              </button>
            </>
          )}
        </div>
      </main>

      {/* Panggil Komponen Features dan Footer */}
      <Features />
      <Footer />

    </div>
  );
}