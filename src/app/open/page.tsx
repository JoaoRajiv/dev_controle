"use client";
import { useState } from "react";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FiX, FiSearch } from "react-icons/fi";

import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .email("Digite o email do cliente para localizar")
    .min(1, "O campo email é obrigatório")
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  function handleDeleteCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email
      }
    });
    if (response.data === null) {
      setError("email", {
        type: "custom",
        message: "Ops, cliente não foi encontrado"
      });
    }
    setCustomer({
      id: response.data.id,
      name: response.data.name
    });
    return;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>
      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-3 px-4 rounded-tl-lg rounded-tr-lg border-2 flex items-center justify-between">
            <h2 className="text-xl">
              <span className="font-bold">Cliente selecionado: </span>
              {customer.name}
            </h2>
            <button
              className="px-2 rounded-tl-lg rounded-tr-lg text-white h-11 border-2"
              onClick={handleDeleteCustomer}
            >
              <FiX size={30} color="red" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-200 py-3 px-2 rounded border-2"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            {" "}
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do cliente"
                type="text"
                error={errors.email?.message}
                register={register}
              />
              <button className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded hover:bg-blue-600 transition-colors">
                Procurar cliente
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}
        {customer && <FormTicket customer={customer} />}
      </main>
    </div>
  );
}
