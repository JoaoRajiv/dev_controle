import { FiTrash, FiFile } from "react-icons/fi";

export function TicketItem() {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-slate-200 duration-300">
        <td className="text-left p-1">Mercado</td>
        <td className="text-left hidden sm:table-cell">01/02/2025</td>
        <td className="text-left">
          <span className="bg-green-400 px-2 py-1 rounded-lg">ABERTO</span>
        </td>
        <td className="text-left">
          <button className="mr-2">
            <FiTrash size={24} color="#EF4444" />
          </button>
          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
