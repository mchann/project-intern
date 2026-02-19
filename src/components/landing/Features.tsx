import { CheckCircle, Zap, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 relative z-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 text-gray-900 tracking-tight">Kenapa MudaPedia?</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="md:col-span-2 bg-gradient-to-br from-white to-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -z-10" />
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle className="text-green-600 w-7 h-7" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-3">Validasi Sekali Klik</h3>
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              Desain khusus untuk efisiensi. Mentor dapat menyetujui, memberi revisi, atau menolak laporan harian intern tanpa harus membuka halaman baru. Real-time dan responsif.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10" />
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="text-blue-600 w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-3">Optimasi Otomatis</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Setiap foto bukti kegiatan otomatis dikonversi ke format <strong>WebP</strong>. Menghemat ruang penyimpanan dan bikin web super ngebut.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-3 bg-gray-900 p-8 md:p-12 rounded-[2rem] border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            
            <div className="max-w-xl z-10">
              <div className="w-14 h-14 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-indigo-400 w-7 h-7" />
              </div>
              <h3 className="font-bold text-2xl text-white mb-3">Keamanan & Role-Based Access</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Data magang tersimpan aman. Sistem mendeteksi otomatis apakah kamu login sebagai <strong>Mentor</strong> atau <strong>Intern</strong>, dan menyesuaikan dashboard yang ditampilkan.
              </p>
            </div>
            
            <div className="w-full md:w-auto flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm shadow-2xl z-10">
              <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                <div className="h-4 bg-white/10 rounded-full w-1/2"></div>
                <div className="h-4 bg-white/10 rounded-full w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}