'use client'

import { useEffect, useState } from 'react'
import Cleave from 'cleave.js/react'
import { Phone } from 'lucide-react'
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
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })
    }
  }, [])

  const enviarCodigo = async () => {
    const numeroLimpo = telefone.replace(/\D/g, '')
    const numeroFormatado = `+55${numeroLimpo}`

    if (numeroFormatado.length < 13) {
      setMensagem('Número de telefone incompleto.')
      return
    }

    try {
      setCarregando(true)
      const resultado = await signInWithPhoneNumber(
        auth,
        numeroFormatado,
        window.recaptchaVerifier
      )
      setConfirmacao(resultado)
      setMensagem('Código enviado via SMS!')
    } catch (err) {
      console.error(err)
      setMensagem('Erro ao enviar código.')
    } finally {
      setCarregando(false)
    }
  }

  const confirmarCodigo = async () => {
    try {
      if (!confirmacao) return
      setCarregando(true)
      const resultado = await confirmacao.confirm(codigo)
      const token = await resultado.user.getIdToken()
      console.log('✅ Token JWT:', token)
      setMensagem('Login realizado com sucesso!')
    } catch (err) {
      console.error(err)
      setMensagem('Erro ao confirmar código.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Login por Telefone</h1>

      {/* Input com máscara leve e ícone */}
      <div className="relative mb-2">
        <Phone className="absolute left-2 top-2.5 text-gray-500 w-5 h-5" />
        <Cleave
          options={{
            blocks: [2, 5, 4], // Ex: 47 99999 0000
            delimiter: ' ',
            numericOnly: true,
          }}
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="49 90000 0000"
          className="w-full p-2 pl-8 border rounded"
        />
      </div>

      <button
        onClick={enviarCodigo}
        disabled={carregando}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {carregando ? 'Enviando...' : 'Enviar código'}
      </button>

      {/* Campo do código SMS */}
      <input
        type="text"
        placeholder="Digite o código SMS"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className="w-full p-2 border rounded mt-4 mb-2"
      />
      <button
        onClick={confirmarCodigo}
        disabled={carregando}
        className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {carregando ? 'Confirmando...' : 'Confirmar'}
      </button>

      {/* Mensagem de feedback */}
      <p className="mt-4 text-center text-sm text-gray-700">{mensagem}</p>

      {/* Recaptcha invisível */}
      <div id="recaptcha-container"></div>
    </div>
  )
}
