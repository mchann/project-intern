"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit } from "lucide-react";

export default function InternActionButtons({ 
  logId, 
  status, 
  initialActivity, 
  initialDescription 
}: { 
  logId: string, 
  status: string, 
  initialActivity: string, 
  initialDescription: string 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 
  const [isEditing, setIsEditing] = useState(false);
  const [activity, setActivity] = useState(initialActivity);
  const [description, setDescription] = useState(initialDescription);

  if (status === "APPROVED" || status === "REJECTED") {
    return <span className="text-[10px] text-gray-400 font-medium italic bg-gray-100 px-2 py-1 rounded-md">Terkunci 🔒</span>;
  }

  // Fungsi Hapus
  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus laporan ini?")) return;
    setLoading(true);
    try {
      await fetch(`/api/logs/${logId}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      alert("Gagal menghapus laporan");
      setLoading(false);
    }
  };


  const handleEdit = async () => {
    setLoading(true);
    try {
      await fetch(`/api/logs/${logId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity, description })
      });
      setIsEditing(false); 
      router.refresh(); // Update tabel
    } catch (error) {
      alert("Gagal update laporan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-end">
        <button 
          onClick={() => setIsEditing(true)} 
          disabled={loading}
          className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-1.5 rounded-md transition disabled:opacity-50"
          title="Edit Laporan"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition disabled:opacity-50"
          title="Hapus Laporan"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* --- POPUP EDIT --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900">✏️ Edit Laporan</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan</label>
                <input 
                  type="text" 
                  value={activity} 
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Luaran / Hasil (Opsional)</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Batal
              </button>
              <button 
                onClick={handleEdit}
                disabled={loading}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}