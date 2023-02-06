import React, { useState, FormEvent } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useLists } from '@/hooks/lists'

type ModalTypes = {
  isVisible: boolean
  setIsVisible: any
}

export default function ListModal(props: ModalTypes) {
  const [valueInput, setValueInput] = useState('')
  const { postLists, loadingHome } = useLists()

  async function handleCreate() {
    postLists(valueInput)

    // colocar validação de erro para fechar ou não
    props.setIsVisible(false)
  }

  function handleCancel() {
    setValueInput('')
    props.setIsVisible(false)
  }

  return (
    <Modal isVisible={props.isVisible}>
      {loadingHome ? (
        <span>Carregando...</span>
      ) : (
        <>
          <span className="text-neutral-700 font-bold text-base mb-4">Nova lista</span>
          <Input
            placeholder="nome da nova lista"
            value={valueInput}
            onChange={(event: FormEvent<HTMLInputElement>) => setValueInput(event.currentTarget.value)}
          />
          <div className="flex justify-between w-full gap-2 mt-4">
            <Button typeBtn="button" color="danger" label="Cancelar" onClick={handleCancel} />
            <Button typeBtn="button" color="success" label="Criar" onClick={handleCreate} />
          </div>
        </>
      )}
    </Modal>
  )
}
