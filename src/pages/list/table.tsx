import { PencilSimple, ShoppingCartSimple } from 'phosphor-react'
import { ItemTypes } from '@/hooks/items/types'
import { useItem } from '@/hooks/items'
import { maskCurrency } from '@/utils/mask'
import { CartVazio } from '@/components/cart/cart-vazio'

interface TableTypes {
  item: ItemTypes[] | []
  handleEdit: any
  isVisible: boolean
  setIsVisible: any
  setTypeEditeOrCreate: any
}

export default function Table(props: TableTypes) {
  const { setItemId, setItem, setCloseModalItem } = useItem()

  function handleEditeItem(item: ItemTypes) {
    setCloseModalItem(false)
    setItem(item)
    setItemId(item.id)
    props.setIsVisible(!props.isVisible)
    props.setTypeEditeOrCreate('edite')
  }

  return (
    <div className="w-full ">
      {props.item?.length > 0 ? (
        <table className="flex flex-col w-full justify-between bg-white ">
          <thead>
            <tr className="flex justify-between px-4 py-2 text-neutral-700 text-base border border-default bg-neutral-100">
              <th>Nome</th>
              <th className="w-20">Ações</th>
            </tr>
          </thead>
          {props.item?.map(item => (
            <tbody>
              <tr className="flex justify-between px-4 py-2 border border-default">
                <td>
                  <span className="text-base font-normal text-neutral-700">{item.title}</span>
                  <div className="-mt-1">
                    <span className="text-xs font-normal text-neutral-500">
                      {`${item.amount} x R$${maskCurrency(String(item.price))} = R$${maskCurrency(
                        String(item.valueTotal)
                      )}`}
                    </span>
                  </div>
                </td>

                <td className="flex justify-center items-center gap-4 w-1/7 min-w-max">
                  <button
                    type="button"
                    className="flex w-8 h-8 justify-center items-center bg-green-700 rounded-full"
                    onClick={() => console.log('onClick')}
                  >
                    <ShoppingCartSimple size={20} color="#fff" />
                  </button>

                  <button
                    type="button"
                    className="flex w-8 h-8 justify-center items-center bg-orange-500 rounded-full"
                    onClick={() => handleEditeItem(item)}
                  >
                    <PencilSimple size={20} color="#fff" />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <div className="flex w-full h-full justify-center items-center  mt-20">
          <CartVazio menseger="Lista vazia" />
        </div>
      )}
    </div>
  )
}
