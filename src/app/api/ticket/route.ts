import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// http://localhost:3000/api/ticket
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string
    }
  });
  if (!findTicket) {
    return NextResponse.json(
      { error: "Failed update ticket" },
      { status: 400 }
    );
  }
  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string
      },
      data: {
        status: "FECHADO"
      }
    });
    return NextResponse.json(
      { message: "Chamado atualizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed update ticket" },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();
  if (!customerId || !name || !description) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  try {
    await prismaClient.ticket.create({
      data: {
        customerId,
        name,
        status: "ABERTO",
        description
      }
    });
    return NextResponse.json(
      { message: "Chamado registrado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create ticket" },
      { status: 400 }
    );
  }
}
