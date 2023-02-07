import { PencilSimple, ShoppingCartSimple } from 'phosphor-react'
import { ItemTypes } from '@/hooks/items/types'
import { useLists } from '@/hooks/lists'
import { useItem } from '@/hooks/items'

interface TableTypes {
  item: ItemTypes[] | []
  handleEdit: any
  isVisible: boolean
  setIsVisible: any
  setTypeEditeOrCreate: any
}

export default function Table(props: TableTypes) {
  const { loading } = useLists()
  const { setItemId, setItem } = useItem()

  function handleEditeItem(item: ItemTypes) {
    setItem(item)
    setItemId(item.id)
    props.setIsVisible(!props.isVisible)
    props.setTypeEditeOrCreate('edite')
  }

  return (
    <div className="w-full ">
      {!loading && props.item?.length === 0 ? (
        <span>Não itens cadastrados</span>
      ) : (
        <table className="flex flex-col w-full justify-between bg-white ">
          <thead>
            <tr className="flex justify-between px-4 py-2 text-neutral-700 text-base border border-default bg-neutral-100">
              <th>Nome</th>
              <th className="w-1/5 min-w-max">Ações</th>
            </tr>
          </thead>
          {props.item?.map(item => (
            <tbody>
              <tr className="flex justify-between px-4 py-2 border border-default">
                <td>
                  <span className="text-base font-normal text-neutral-700">{item.title}</span>
                  <div className="-mt-1">
                    <span className="text-xs font-normal text-neutral-500">{`${item.amount} x ${item.price} = ${item.amount}`}</span>
                  </div>
                </td>

                <td className="flex justify-center items-center gap-4 w-1/5 min-w-max">
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
      )}
    </div>
  )
}
