"use client";

import { useRouter } from "next/navigation";

export default function FilterDropdown({ 
  internNames, 
  currentSearch, 
  activeTab 
}: { 
  internNames: string[]; 
  currentSearch: string; 
  activeTab: string; 
}) {
  const router = useRouter();

  return (
    <div className="relative w-full md:w-72">
      <select
        value={currentSearch}
        onChange={(e) => {
          const val = e.target.value;
        
          router.push(`/dashboard?tab=${activeTab}${val ? `&search=${val}` : ""}`);
        }}
        className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm bg-white appearance-none cursor-pointer font-medium text-gray-700"
      >
        <option value="">👥 Semua Intern</option>
        {internNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
      
      {/* Icon Panah Bawah biar dropdown-nya kelihatan elegan */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}