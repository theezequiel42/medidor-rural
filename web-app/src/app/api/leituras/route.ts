import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET: Listar todas as leituras
export async function GET() {
  const leituras = await prisma.leitura.findMany({
    include: {
      morador: true,
    },
    orderBy: {
      data: 'desc',
    },
  })

  return NextResponse.json(leituras)
}

// POST: Criar uma nova leitura
export async function POST(request: Request) {
  const data = await request.json()

  const novaLeitura = await prisma.leitura.create({
    data: {
      valorM3: data.valorM3,
      moradorId: data.moradorId,
      data: data.data ? new Date(data.data) : undefined,
    },
  })

  return NextResponse.json(novaLeitura)
}
