"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApproveButton({ logId, currentStatus }: { logId: string, currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (status: string) => {
    setLoading(true);
    try {
      await fetch("/api/logs/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logId, status }),
      });
      router.refresh(); 
    } catch (error) {
      alert("Gagal update status");
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus === "APPROVED") {
    return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">✅ APPROVED</span>;
  }
  if (currentStatus === "REJECTED") {
    return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">❌ REJECTED</span>;
  }

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleUpdate("APPROVED")} 
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition"
      >
        Approve
      </button>
      <button 
        onClick={() => handleUpdate("REJECTED")} 
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition"
      >
        Reject
      </button>
    </div>
  );
}