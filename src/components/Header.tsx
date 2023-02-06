import { Plus } from 'phosphor-react'
import React from 'react'
import { H1 } from './text'

type HeaderTypes = {
  handleOpenModal?: () => void
}

export default function Header(props: HeaderTypes) {
  return (
    <div className="max-w-screen-md w-full h-16 flex bg-primary px-6 py-2 items-center justify-between drop-shadow-md">
      <H1 label="Lista" color="white" />

      <button
        type="button"
        className="flex w-8 h-8 justify-center items-center bg-white rounded-full"
        onClick={props.handleOpenModal}
      >
        <Plus size={20} className="text-primary" />
      </button>
    </div>
  )
}
