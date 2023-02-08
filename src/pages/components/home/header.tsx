import { HeaderComponent } from '@/components/header'
import { Plus } from 'phosphor-react'
import React from 'react'
import { H1 } from '../../../components/text'

type HeaderTypes = {
  handleOpenModal?: () => void
}

export default function Header(props: HeaderTypes) {
  return (
    <HeaderComponent>
      <H1 label="Lista" color="white" />

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
