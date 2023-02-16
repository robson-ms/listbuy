import Button from '@/components/button'
import Input from '@/components/Input'
import Layout from '@/components/layout'
import { H1 } from '@/components/text'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { InputPassword } from '@/components/InputPassword'
import { ShoppingCartSimple } from 'phosphor-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [confirmePassword, setConfirmePassword] = useState('')
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (name === '' || email === '' || password === '' || confirmePassword === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [name, email, password, confirmePassword])

  async function handleSubmit(e: FormEvent) {
    setDisabled(true)
    e.preventDefault()
    const load = toast.loading('Carregando...')
    const value = {
      name,
      email,
      password,
      confirmePassword,
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    }

    await fetch('http://localhost:3000/api/auth/signup', options)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          toast.update(load, {
            render: 'Usuário cadastrado com sucesso!',
            type: 'success',
            isLoading: false,
            autoClose: 4000,
          })
          router.push('http://localhost:3000/login')
        } else {
          toast.update(load, { render: String(data), type: 'error', isLoading: false, autoClose: 4000 })
        }
      })
    setDisabled(false)
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center pt-10">
        <div>
          <ShoppingCartSimple size={32} color="#fff" />
        </div>
        <h1 className="text-white mt-2 ">Bem-vindo a Minha lista</h1>
      </div>
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-primary p-8 rounded-lg mx-6">
          <H1 color="white" label="Cadastro" />
          <form onSubmit={handleSubmit} className="space-y-3 mt-4 mx-auto max-w-xs ">
            <Input
              type="text"
              placeholder="Nome"
              height={40}
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
            <Input
              type="email"
              placeholder="E-mail"
              height={40}
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
            <InputPassword
              placeholder="Senha"
              height={40}
              value={password}
              onChange={e => setPasword(e.currentTarget.value)}
            />
            <InputPassword
              placeholder="Repita a senha"
              height={40}
              value={confirmePassword}
              onChange={e => setConfirmePassword(e.currentTarget.value)}
            />
            <Button color="success" label="Entrar" typeBtn="submit" disabled={disabled} />
          </form>

          <div className="flex mt-6">
            <p className="text-white text-base mr-2">Tem uma conta?</p>
            <Link href="/login" className="text-green-600 font-bold hover:text-green-400  ease-in duration-200">
              Fazer login
            </Link>
          </div>
        </div>
      </div>
      <footer className="h-16">
        <span className="text-white/70 text-xs mb-4">© 2023-2023 Robson Silva </span>
      </footer>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if (!!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: { session } }
}
