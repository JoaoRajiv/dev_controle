"use client";
import { Container } from "@/components/container";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-2 rounded-lg flex gap-2 shadow-2xs z-index-10">
        <Link
          href="/dashboard"
          className={`p-1.5 rounded-lg text-white hover:bg-blue-500 transition-all duration-500 ${pathname === "/dashboard" ? "bg-blue-500" : ""}`}
        >
          Chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className={`p-1.5 rounded-lg text-white hover:bg-blue-500 transition-all duration-500 ${pathname === "/dashboard/customer" ? "bg-blue-500" : ""}`}
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
}
