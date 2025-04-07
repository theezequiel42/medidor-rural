'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth'

export default function LoginPage() {
  const [telefone, setTelefone] = useState('')
  const [codigo, setCodigo] = useState('')
  const [confirmacao, setConfirmacao] = useState<ConfirmationResult | null>(null)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })
    }
  }, [])

  const enviarCodigo = async () => {
    try {
      const resultado = await signInWithPhoneNumber(
        auth,
        telefone,
        window.recaptchaVerifier
      )
      setConfirmacao(resultado)
      setMensagem('Código enviado via SMS!')
    } catch (err) {
      console.error(err)
      setMensagem('Erro ao enviar código.')
    }
  }

  const confirmarCodigo = async () => {
    try {
      if (!confirmacao) return
      const resultado = await confirmacao.confirm(codigo)
      const token = await resultado.user.getIdToken()
      console.log('✅ Token JWT:', token)
      setMensagem('Login realizado com sucesso!')
    } catch (err) {
      console.error(err)
      setMensagem('Erro ao confirmar código.')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login por Telefone</h1>

      <input
        type="tel"
        placeholder="+55 47 99999-0000"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={enviarCodigo} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Enviar código
      </button>

      <input
        type="text"
        placeholder="Digite o código SMS"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className="w-full p-2 border rounded mt-4 mb-2"
      />
      <button onClick={confirmarCodigo} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Confirmar
      </button>

      <p className="mt-4 text-center text-sm">{mensagem}</p>

      <div id="recaptcha-container"></div>
    </div>
  )
}
