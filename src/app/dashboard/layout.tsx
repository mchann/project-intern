import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { Users, FileText, History, Edit3 } from "lucide-react"; // icontmbhn

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const currentUser = session.user as { name?: string; email?: string; role?: string };
  const isMentor = currentUser.role === "MENTOR";

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans overflow-hidden">
      
      {/* sidebaaaaaaaaaar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm hidden md:flex">
        
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Muda Pedia <span className="text-blue-600">Intern</span>
          </h1>
        </div>

        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
              {currentUser.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Menu Utama
          </div>
          
          {isMentor ? (
            <>
              <Link href="/dashboard?tab=laporan" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition">
                <FileText className="w-5 h-5 text-gray-500" />
                Laporan Masuk
              </Link>
              <Link href="/dashboard?tab=magang" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition">
                <Users className="w-5 h-5 text-gray-500" />
                Kelola Anak Magang
              </Link>
            </>
          ) : (
            <>
              {/* --- untuk intern --- */}
              <Link href="/dashboard?tab=isi-laporan" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition">
                <Edit3 className="w-5 h-5 text-gray-500" />
                Isi Laporan Harian
              </Link>
              <Link href="/dashboard?tab=riwayat" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition">
                <History className="w-5 h-5 text-gray-500" />
                Riwayat Laporan
              </Link>
              <Link href="" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition">
                <FileText className="w-5 h-5 text-gray-500" />
                Task Dari Mentor
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50/50">
        <div className="p-8 md:p-12 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}