import Button from '@/components/button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { H2 } from '@/components/text'
import { useItem } from '@/hooks/items'
import { maskCurrency, unMaskCurrency, unMaskCurrencySubmit } from '@/utils/mask'
import { useEffect, useState } from 'react'
interface AddItemModalTypes {
  isVisible: boolean
  setIsVisible: any
  listId: number
  type: string
}

export default function ModalEditeOrCreate(props: AddItemModalTypes) {
  const { item, setItem, itemId, closeModal, postItem, updateItem, deleteItem } = useItem()
  const [title, setTitle] = useState(item.title ? item.title : '')
  const [amount, setAmount] = useState(item.amount ? item.amount : '')
  const [price, setPrice] = useState(item.price ? item.price : '')
  const [valueTotal, setValueTotal] = useState(item.valueTotal ? item.valueTotal : '')

  useEffect(() => {
    const newPrice = unMaskCurrency(String(price))
    setValueTotal(maskCurrency(String(Number(amount) * Number(newPrice))))
  }, [amount, price])

  async function handleSubmitCreateOrEdite(e: any) {
    e.preventDefault()
    const data = {
      title: title,
      price: Number(unMaskCurrencySubmit(String(price))),
      amount: Number(amount),
      valueTotal: Number(unMaskCurrencySubmit(String(valueTotal))),
      listId: Number(props.listId),
    }
    if (props.type === 'create') {
      await postItem(data)

      if (closeModal) {
        props.setIsVisible(!props.isVisible)
      }
    } else {
      await updateItem({ ...data, itemId: Number(itemId) })

      if (closeModal) {
        props.setIsVisible(!props.isVisible)
      }
    }
  }

  async function handleDelete() {
    if (itemId) {
      await deleteItem(itemId)
      setItem({})
    }

    if (closeModal) {
      props.setIsVisible(!props.isVisible)
    }
  }

  function handleCancel() {
    setItem(itemId, {})
    props.setIsVisible(!props.isVisible)
  }

  return (
    <Modal>
      <div>
        <div className="flex w-full justify-center items-center">
          <H2 label="Add New Items" color="black" />
        </div>

        <form onSubmit={handleSubmitCreateOrEdite}>
          <Input
            type="text"
            placeholder="Titulo"
            onChange={e => setTitle(e.currentTarget.value)}
            defaultValue={item.title ? item.title : title}
          />

          <div className="flex gap-2 mt-2 text-neutral-700 text-sm">
            <div className="flex flex-col items-center">
              <label htmlFor="amount">Unidades</label>
              <Input type="text" onChange={e => setAmount(e.currentTarget.value)} value={amount} />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="price">Preço</label>
              <Input type="text" onChange={e => setPrice(maskCurrency(e.currentTarget.value))} value={price} />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="total">Total</label>
              <Input disabled type="text" value={valueTotal} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between w-full gap-2 mt-4 mb-2">
              <Button typeBtn="submit" color="danger" label="Apagar" onClick={() => handleDelete()} />
              <Button typeBtn="submit" color="success" label="Salva" />
            </div>
            <Button typeBtn="button" color="default" label="Cancelar" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </Modal>
  )
}
