"use client";
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefresh() {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <button
      onClick={handleRefresh}
      className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600 duration-300"
    >
      {/* Adicionado "animate-spin" aqui */}
      <FiRefreshCcw size={24} className="" />
    </button>
  );
}
