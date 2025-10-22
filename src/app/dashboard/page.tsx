import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO"
    },
    include: {
      customer: true
    },
    orderBy: {
      created_at: "desc"
    }
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600 duration-300"
          >
            Abrir Chamado
          </Link>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                DATA CADASTRO
              </th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <p className="mt-6 px-2 md:px-0 text-gray-600">
            Nenhum chamado encontrado.
          </p>
        )}
      </main>
    </Container>
  );
}
