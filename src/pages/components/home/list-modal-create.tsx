import React, { useState, FormEvent } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Button from '@/components/button'
import { useLists } from '@/hooks/lists'

type ModalTypes = {
  isVisibleModalCreate: boolean
  setIsVisibleModalCreate: any
}

export default function ListModal(props: ModalTypes) {
  const [valueInput, setValueInput] = useState('')
  const { postLists, closeModal } = useLists()

  async function handleCreate() {
    await postLists(valueInput)

    if (closeModal) {
      props.setIsVisibleModalCreate(false)
    }
  }

  function handleCancel() {
    setValueInput('')
    props.setIsVisibleModalCreate(false)
  }

  return (
    <Modal>
      <span className="text-neutral-700 font-bold text-base mb-4">Nova lista</span>
      <Input
        placeholder="nome da nova lista"
        value={valueInput}
        onChange={(event: FormEvent<HTMLInputElement>) => setValueInput(event.currentTarget.value)}
      />
      <div className="flex justify-between w-full gap-2 mt-4">
        <Button typeBtn="button" color="danger" label="Cancelar" onClick={handleCancel} />
        <Button typeBtn="button" color="success" label="Salvar" onClick={handleCreate} />
      </div>
    </Modal>
  )
}
