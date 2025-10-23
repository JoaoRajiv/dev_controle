"use client";
import { useContext } from "react";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/tickets.type";
import { FiFile, FiCheckSquare } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);
  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", { id: ticket.id });
      console.log("Ticket status updated:", response.data);
      router.refresh();
    } catch (error) {
      console.log("Error updating ticket status:", error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-slate-200 duration-300">
        <td className="text-left p-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at &&
            new Date(ticket.created_at).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            })}
        </td>
        <td className="text-left">
          <span className="bg-green-400 px-2 py-1 rounded-lg">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button
            className="mr-3 text-gray-500 hover:text-green-400 duration-300 active:animate-spin"
            onClick={handleChangeStatus}
          >
            <FiCheckSquare size={24} />
          </button>
          <button onClick={handleOpenModal} className="active:animate-ping">
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
