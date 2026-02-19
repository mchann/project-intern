import LogForm from "@/components/LogForm";
import InternActionButtons from "@/components/InternActionButtons";

export default function InternDashboard({ activeTab, myLogs }: { activeTab: string, myLogs: any[] }) {
  
 
  const typeColors: Record<string, string> = {
    HADIR: "bg-green-100 text-green-700",
    IZIN: "bg-orange-100 text-orange-700",
    SAKIT: "bg-red-100 text-red-700",
  };

  const statusColors: Record<string, string> = {
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  const statusIcons: Record<string, string> = {
    APPROVED: "✅ APPROVED",
    REJECTED: "❌ REJECTED",
    PENDING: "⏳ PENDING",
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {activeTab === "isi-laporan" ? "Form Laporan Harian" : "Riwayat Laporan Saya"}
        </h2>
        <p className="text-gray-500">
          {activeTab === "isi-laporan" 
            ? "Silakan isi progres magangmu hari ini dengan detail." 
            : "Pantau status validasi laporan harianmu dari mentor di sini."}
        </p>
      </div>

      {activeTab === "isi-laporan" && (
        <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <LogForm />
        </div>
      )}

      {activeTab === "riwayat" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Daftar Laporan Terkirim</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Total: {myLogs.length} Laporan
            </span>
          </div>
          
          {myLogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Heyyy.. belum pernah membuat laporan. Ayo bikin laporan pertamamu sekarang Hehe!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-semibold">
                    <th className="px-6 py-4">Tanggal</th>
                    <th className="px-6 py-4">Tipe</th>
                    <th className="px-6 py-4">Kegiatan</th>
                    <th className="px-6 py-4">Bukti</th>
                    <th className="px-6 py-4 text-right">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {myLogs.map((log, index) => {
                    // Panggil status yang defaultnya PENDING
                    const currentStatus = log.status || "PENDING";
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {new Date(log.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${typeColors[log.type] || "bg-gray-100 text-gray-700"}`}>
                            {log.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 max-w-[250px] truncate" title={log.activity}>
                          {log.activity}
                        </td>
                        <td className="px-6 py-4">
                          {log.imageUrl ? (
                            <a href={log.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">Lihat WebP</a>
                          ) : (
                            <span className="text-gray-400 italic">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`${statusColors[currentStatus]} px-3 py-1 rounded-full text-xs font-bold`}>
                            {statusIcons[currentStatus]}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-end">
                          <InternActionButtons 
                            logId={log._id.toString()} 
                            status={currentStatus} 
                            initialActivity={log.activity} 
                            initialDescription={log.description || ""}
                        />
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        )}
        </div>
      )}
    </div>
  );
}