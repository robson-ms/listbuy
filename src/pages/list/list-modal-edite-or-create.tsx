import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { H2 } from '@/components/text'
import { useItem } from '@/hooks/items'
import { useForm } from 'react-hook-form'
interface AddItemModalTypes {
  isVisible: boolean
  setIsVisible: any
  listId: number
  type: string
}

export default function ModalEditeOrCreate(props: AddItemModalTypes) {
  const { item, setItem, itemId, postItem, updateItem, deleteItem } = useItem()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title ? item.title : '',
      amount: item.amount ? item.amount : '',
      price: item.price ? item.price : '',
      valueTotal: item.valueTotal ? item.valueTotal : '',
    },
  })

  function handleSubmitCreateOrEdite(data: any) {
    if (props.type === 'create') {
      postItem({
        ...data,
        listId: Number(props.listId),
      })
    } else {
      updateItem({
        itemId,
        ...data,
      })
    }
  }

  function handleDelete() {
    if (itemId) {
      deleteItem(itemId)
      setItem(itemId, {})
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

        <form onSubmit={handleSubmit(handleSubmitCreateOrEdite)}>
          <input
            type="text"
            {...register('title')}
            placeholder="Titulo"
            className="w-full border-2 px-4 h-12 border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-primary  focus:ring-primary"
          />

          <div className="flex gap-2 mt-2 text-neutral-700 text-sm">
            <div className="flex flex-col items-center">
              <label htmlFor="titulo">Unidades</label>
              <input
                type="text"
                {...register('amount')}
                className="w-full border-2 px-4 h-9 border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-primary  focus:ring-primary"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="titulo">Preço</label>
              <input
                type="text"
                {...register('price')}
                className="w-full border-2 px-4 h-9 border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-primary  focus:ring-primary"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="titulo">Total</label>
              <input
                type="text"
                {...register('valueTotal')}
                className="w-full border-2 px-4 h-9 border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-primary  focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between w-full gap-2 mt-4 mb-2">
              <Button typeBtn="submit" color="danger" label="Apagar" onClick={() => handleDelete()} />
              <Button typeBtn="submit" color="success" label="Salva" />
            </div>
            <Button typeBtn="button" label="Cancelar" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </Modal>
  )
}
