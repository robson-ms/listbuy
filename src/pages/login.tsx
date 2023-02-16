import Button from '@/components/button'
import Input from '@/components/Input'
import Layout from '@/components/layout'
import { H1 } from '@/components/text'
import Link from 'next/link'
import Image from 'next/image'
import GoogleIcon from '/public/icons/google.png'
import { FormEvent, useEffect, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { InputPassword } from '@/components/InputPassword'
import { ShoppingCartSimple } from 'phosphor-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [disabled, setDisabled] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (email === '' || password === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [email, password])

  async function handleSubmit(e: FormEvent) {
    setDisabled(true)
    e.preventDefault()
    const load = toast.loading('Carregando...')
    const status = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    })

    if (status?.ok) {
      router.push(String(status.url))
      toast.update(load, { render: 'Logado com sucesso!', type: 'success', isLoading: false, autoClose: 4000 })
    } else {
      setDisabled(false)
      toast.update(load, { render: status?.error, type: 'error', isLoading: false, autoClose: 4000 })
    }
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
          <H1 color="white" label="Login" />
          <form onSubmit={handleSubmit} className="space-y-3 mt-4 mx-auto max-w-xs ">
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
            <Button color="success" label="Entrar" typeBtn="submit" disabled={disabled} />
          </form>

          <div className="flex mt-6">
            <p className="text-white text-base mr-2">Não tem uma conta?</p>
            <Link href="/signup" className="text-green-600 font-bold hover:text-green-400  ease-in duration-200">
              Cadastre-se
            </Link>
          </div>

          <div className="flex mt-6 justify-center items-center">
            <p className="text-white text-base mr-2">Ou entre com</p>

            <button
              className="flex bg-white px-4 py-1 rounded-md hover:bg-white/70 ease-in duration-200 justify-center items-center"
              onClick={() => signIn('google')}
            >
              <Image alt="logo-google" src={GoogleIcon} width={20} />
              <span className="text-neutral-700 ml-2">Google</span>
            </button>
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