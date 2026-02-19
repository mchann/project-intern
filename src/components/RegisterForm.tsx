"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, CheckCircle2, AlertCircle, UserPlus } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.fieldErrors ? "Cek inputan lagi" : data.error);
      }

      setSuccess("Yeayy! Akun Anak Magang berhasil dibuat.");
      setForm({ name: "", email: "", password: "" }); // Reset form
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Gagal membuat akun");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Notifikasi Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-6 bg-red-50/80 border border-red-100 p-3.5 rounded-xl animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

   
      {success && (
        <div className="flex items-center gap-2 text-green-700 text-sm mb-6 bg-green-50/80 border border-green-100 p-3.5 rounded-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-700">Nama Lengkap</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Misal: Budi Santoso"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-700">Email Magang</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none"
              placeholder="budi@intern.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-700">Password Awal</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none"
              placeholder="Minimal 6 karakter"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1">Password ini nantinya akan diberikan ke anak magang untuk login.</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Menyimpan...
            </span>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Simpan Akun Intern
            </>
          )}
        </button>
      </form>
    </div>
  );
}