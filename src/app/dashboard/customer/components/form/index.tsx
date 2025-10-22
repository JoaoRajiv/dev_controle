"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.email({ message: "Digite um email válido" }),
  phone: z.string().refine(
    value => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O número de telefone deve estar no formato (XX) XXXXX-XXXX"
    }
  ),
  address: z.string()
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    const response = await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId
    });
    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-xl font-medium">Nome Completo *</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        register={register}
        error={errors.name?.message}
      />

      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-xl font-medium">Telefone *</label>
          <Input
            type="number"
            name="phone"
            placeholder="Ex: (11) 91234-5678"
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-xl font-medium">Email *</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu melhor email"
            register={register}
            error={errors.email?.message}
          />
        </div>
      </section>
      <label className="mb-1 text-xl font-medium">Endereço</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente"
        register={register}
        error={errors.address?.message}
      />
      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:bg-blue-600 transition-colors duration-500"
      >
        Cadastrar
      </button>
    </form>
  );
}
