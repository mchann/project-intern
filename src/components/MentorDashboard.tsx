import FilterDropdown from "@/components/FilterDropdown";
import RegisterForm from "@/components/RegisterForm";
import ApproveButton from "@/components/ApproveButton";
import { Inbox, FileText } from "lucide-react";

export default function MentorDashboard({ activeTab, searchQuery, logs, internNames, interns }: any) {
  
  const typeColors: Record<string, string> = {
    HADIR: "bg-green-100 text-green-700 border-green-200",
    IZIN: "bg-orange-100 text-orange-700 border-orange-200",
    SAKIT: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === "laporan" ? "Daftar Laporan Masuk" : "Manajemen Anak Magang"}
          </h2>
          <p className="text-gray-500">
            {activeTab === "laporan" ? "Validasi dan pantau progres harian di sini." : "Tambahkan akun baru atau lihat daftar yang sudah ada."}
          </p>
        </div>

        <FilterDropdown 
          internNames={internNames} 
          currentSearch={searchQuery} 
          activeTab={activeTab} 
        />
      </div>

      {activeTab === "laporan" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100 shadow-inner">
                <Inbox className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Laporan Masuk</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                {searchQuery 
                  ? `Pencarian untuk "${searchQuery}" tidak ditemukan.` 
                  : "Anak magang belum mengirimkan laporan harian mereka."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider font-extrabold">
                    <th className="px-6 py-5 rounded-tl-2xl">Tanggal</th>
                    <th className="px-6 py-5">Nama Intern</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Kegiatan</th>
                    <th className="px-6 py-5 text-center">Bukti Foto</th>
                    <th className="px-6 py-5 text-right rounded-tr-2xl">Aksi Validasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.map((log: any, index: number) => (
                    <tr key={index} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-900 block">
                          {new Date(log.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(log.date).toLocaleDateString("id-ID", { year: "numeric" })}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                            {(log.name || log.user?.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-800">{log.name || log.user?.name || "Anonim"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                       
                        <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                          typeColors[log.type] || "bg-gray-100 text-gray-700 border-gray-200"
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-gray-700 font-medium max-w-[250px] truncate" title={log.activity}>
                          {log.activity}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {log.imageUrl ? (
                          <a href={log.imageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors">
                            <FileText className="w-3.5 h-3.5" /> Lihat
                          </a>
                        ) : (
                          <span className="text-gray-300 italic text-xs font-medium">- Kosong -</span>
                        )}
                      </td>
                      <td className="px-6 py-5 flex justify-end">
                        <ApproveButton logId={log._id.toString()} currentStatus={log.status || "PENDING"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "magang" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Tambah Akun Baru</h3>
            <RegisterForm />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
             <div className="p-6 border-b border-gray-100">
               <h3 className="text-lg font-bold text-gray-900">Anak Magang Aktif</h3>
             </div>
            {interns.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchQuery ? `Tidak ada data untuk "${searchQuery}".` : "Belum ada anak magang."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {interns.map((intern: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{intern.name}</p>
                          <p className="text-gray-500">{intern.email}</p>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-400 text-xs">
                          Sejak {new Date(intern.createdAt).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}