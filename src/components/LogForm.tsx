"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logSchema, LogInput } from "@/types/log"; 
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

const getTodayDateString = () => {
    return new Date().toISOString().split("T")[0];
};

export default function LogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<LogInput>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      date: getTodayDateString(),
      type: "HADIR",
      activity: "",
      description: "",
    }
  });

  const typeValue = watch("type");
  const isHadir = typeValue === "HADIR";

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file asli maksimal 10MB!");
      return;
    }

    try {
      const options = {
        maxSizeMB: 0.19,
        maxWidthOrHeight: 1000, 
        useWebWorker: true,
        fileType: "image/webp" 
      };
      
      const compressedFile = await imageCompression(file, options);

      if (compressedFile.size > 200 * 1024) {
        setError("Gagal mengompres gambar hingga < 200KB. Coba gambar lain.");
        return;
      }
      setValue("file", compressedFile as any); 
      
      setPreview(URL.createObjectURL(compressedFile));
      setError("");
      
    } catch (err) {
      console.error(err);
      setError("Gagal memproses gambar.");
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      
      formData.append("date", data.date); 
      formData.append("type", data.type);
      formData.append("activity", data.activity);
      formData.append("description", data.description || "");

      if (isHadir && data.file) {
        formData.append("file", data.file);
      }

      const res = await fetch("/api/logs", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error?.error || result.error || "Gagal submit");
      }

      alert("Yeay Laporan berhasil dikirim! 🎉");
      setPreview(null);
      router.push("/dashboard?tab=riwayat")
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded text-sm font-medium">{error}</div>}

      <div>
        <label className="block font-medium mb-2 text-gray-700">Tanggal Kegiatan</label>
        <input 
          type="date"
          {...register("date")}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-700">Status Kehadiran</label>
        <select {...register("type")} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="HADIR">Hadir (WFO/WFA)</option>
          <option value="SAKIT">Sakit</option>
          <option value="IZIN">Izin</option>
          <option value="LIBUR">Libur</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-700">Nama Kegiatan</label>
        <input 
          {...register("activity")}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Membuat API Login"
        />
        {errors.activity && <p className="text-red-500 text-xs mt-1">{errors.activity.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-700">Luaran / Hasil</label>
        <textarea 
          {...register("description")}
          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Ceritakan detail kendala atau hasil hari ini..."
        />
      </div>

      {isHadir && (
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition">
          <label className="block font-medium mb-2 text-gray-700">Bukti Kegiatan (Wajib)</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">
            Upload JPG/PNG (Max 10MB). Sistem otomatis convert ke WebP.
          </p>
          
          {preview && (
            <div className="mt-4 animate-fade-in">
              <p className="text-xs text-green-600 mb-1 font-bold">✅ Siap Upload (WebP)</p>
              <img src={preview} alt="Preview" className="h-40 mx-auto rounded-lg object-cover shadow-md" />
            </div>
          )}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
      >
        {loading ? "Mengirim Laporan..." : "Kirim Laporan"}
      </button>
    </form>
  );
}