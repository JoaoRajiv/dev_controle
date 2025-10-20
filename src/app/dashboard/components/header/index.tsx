import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-300 my-4 p-2 rounded flex gap-4 shadow-2xs z-index-10 ">
        <Link
          href="/dashboard"
          className="p-1.5 rounded hover:bg-gray-100 duration-500"
        >
          Chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className="p-1.5 rounded hover:bg-gray-100 transition-all duration-500"
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
}
