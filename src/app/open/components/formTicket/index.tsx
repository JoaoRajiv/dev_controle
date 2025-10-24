"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "Descreva o problema do cliente")
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  async function handleRegister(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id
    });
    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      className="bg-slate-200 py-6 px-4 rounded-b-lg border-2 flex flex-col gap-3"
      onSubmit={handleSubmit(handleRegister)}
    >
      <label className="text-lg font-medium mb-1">Nome do chamado</label>
      <Input
        register={register}
        type="text"
        name="name"
        placeholder="Digite o nome do chamado"
        error={errors.name?.message}
      />
      <label className="text-lg font-medium mb-1">Descreva o problema</label>
      <textarea
        className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
        id="description"
        placeholder="Descreva o problema"
        {...register("description")}
      ></textarea>
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Abrir chamado
      </button>
    </form>
  );
}
