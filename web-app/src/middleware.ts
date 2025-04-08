import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminAuth } from './lib/firebase-admin'

export async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Token não informado' }, { status: 401 })
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    request.headers.set('user-id', decodedToken.uid)
    request.headers.set('user-phone', decodedToken.phone_number || '')
    return NextResponse.next()
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/leituras/:path*', '/api/usuarios/:path*'],
}
