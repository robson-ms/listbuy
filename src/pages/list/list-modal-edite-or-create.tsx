import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { H2 } from '@/components/text'
import { useItem } from '@/hooks/items'
import { useLists } from '@/hooks/lists'
import { useEffect, useState } from 'react'

interface AddItemModalTypes {
  isVisible: boolean
  setIsVisible: any
  listId: number
  type: string
}

export default function ModalEditeOrCreate(props: AddItemModalTypes) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const { featchItem, item, success, postItem, itemId } = useItem()
  const { featchListItems } = useLists()

  useEffect(() => {
    if (itemId) {
      featchItem(itemId)
    }

    if (item) {
      setTitle(item.title)
      setAmount(item.amount?.toString())
      setPrice(item.price)
      setTotalValue(item.valueTotal)
    }
  }, [])

  async function handleSubmit(e: any) {
    e.preventDefault()
    const data = {
      title,
      amount,
      price,
      totalValue,
      listId: props.listId,
    }
    await postItem(data)
    clearInputs()
  }

  function clearInputs() {
    if (success) {
      setTitle('')
      setAmount('')
      setPrice('')
      setTotalValue('')
    }
  }
  return (
    <Modal>
      <div>
        <div className="flex w-full justify-center items-center">
          <H2 label="Add New Items" color="black" />
        </div>

        <form onSubmit={handleSubmit}>
          <Input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)} placeholder="Titulo" />

          <div className="flex gap-2 mt-2 text-neutral-700 text-sm">
            <div className="flex flex-col items-center">
              <label htmlFor="titulo">Unidades</label>
              <Input type="text" value={amount} onChange={e => setAmount(e.currentTarget.value)} height={36} />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="titulo">Preço</label>
              <Input type="text" value={price} onChange={e => setPrice(e.currentTarget.value)} height={36} />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="titulo">Total</label>
              <Input type="text" value={totalValue} onChange={e => setTotalValue(e.currentTarget.value)} height={36} />
            </div>
          </div>
          <div className="flex justify-between w-full gap-2 mt-4">
            <Button
              typeBtn="button"
              color="danger"
              label="Cancelar"
              onClick={() => props.setIsVisible(!props.isVisible)}
            />
            <Button typeBtn="submit" color="success" label="Criar" />
          </div>
        </form>
      </div>
    </Modal>
  )
}
