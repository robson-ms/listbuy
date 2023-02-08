import { HeaderComponent } from '@/components/header'
import { H1 } from '@/components/text'
import { ArrowLeft, Plus } from 'phosphor-react'
import React from 'react'

type HeaderTypes = {
  handleBack?: any
  title: string
  handleCreateNewItem: any
}

export default function Header(props: HeaderTypes) {
  return (
    <HeaderComponent>
      <div className="flex w-full items-center">
        <div className="flex p-2 mr-2 hover:opacity-50 rounded-full focus:opacity-50">
          <ArrowLeft size={25} color="#fff" onClick={() => props.handleBack()} />
        </div>
        <div className="flex flex-col w-full justify-center items-center mr-5">
          <H1 label={`${props?.title ? props?.title : ''}`} color="white" />
          <div className="font-normal text-sm text-white">
            <span> {`$265 Produtos | Total R$987,58`} </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-1.5/5 min-w-max">
        <button
          type="button"
          className="flex w-8 h-8 justify-center items-center bg-white rounded-full"
          onClick={props.handleCreateNewItem}
        >
          <Plus size={20} className="text-primary" />
        </button>
      </div>
    </HeaderComponent>
  )
}
