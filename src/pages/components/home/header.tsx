import Button from '@/components/button'
import { HeaderComponent } from '@/components/header'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, User as UserProfile } from 'phosphor-react'
import React from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

type HeaderTypes = {
  handleOpenModal?: () => void
}

export default function Header(props: HeaderTypes) {
  const session = useSession()
  const imgProfile = session.data?.user?.image || ''

  const router = useRouter()

  function handleSignOut() {
    signOut({
      callbackUrl: '/login',
    })
  }

  return (
    <HeaderComponent>
      {session && (
        <div className="flex items-center space-x-3">
          <div className="flex w-8 h-8 rounded-full bg-white justify-center items-center border border-white">
            {imgProfile ? (
              <Image src={imgProfile} alt="profile" width={40} height={40} className="rounded-full" />
            ) : (
              <UserProfile size={25} color="#999" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-xs">Olá, {session.data?.user?.name}</span>
            <Link
              href="/singout"
              className="text-white text-xs font-bold ease-in duration-200 hover:opacity-60"
              onClick={handleSignOut}
            >
              Sair
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        className="flex w-8 h-8 justify-center items-center bg-white rounded-full"
        onClick={props.handleOpenModal}
      >
        <Plus size={20} className="text-primary" />
      </button>
    </HeaderComponent>
  )
}
