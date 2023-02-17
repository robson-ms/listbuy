import { useEffect } from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/button'
import { useLists } from '@/hooks/lists'
import { H2, Span } from '@/components/text'

type ModalDeleteTypes = {
  isVisible: boolean
  setIsVisible: any
  listId: number
  listName: string
}

export default function ListModalDeleteConfirme(props: ModalDeleteTypes) {
  const { deleteLists, closeModal } = useLists()

  useEffect(() => {
    if (closeModal) {
      props.setIsVisible(false)
    }
  }, [closeModal])

  async function handleDelete() {
    await deleteLists(props.listId)

    if (closeModal) {
      props.setIsVisible(false)
    }
  }

  function handleCancel() {
    props.setIsVisible(false)
  }

  return (
    <Modal>
      <H2 label="Deseja mesma apagar essa lista?" color="black" />
      <span className="text-neutral-700">{props.listName}</span>
      <div className="flex justify-between w-full gap-2 mt-4">
        <Button typeBtn="button" color="danger" label="Cancelar" onClick={handleCancel} />
        <Button typeBtn="button" color="success" label="Deletar" onClick={handleDelete} />
      </div>
    </Modal>
  )
}
