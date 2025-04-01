// src/app/api/usuarios/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const usuarios = await prisma.usuario.findMany()
  return NextResponse.json(usuarios)
}

export async function POST(request: Request) {
  const data = await request.json()

  const novoUsuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      telefone: data.telefone,
      papel: data.papel,
    },
  })

  return NextResponse.json(novoUsuario)
}
