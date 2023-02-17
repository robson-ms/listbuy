import { HeaderComponent } from '@/components/header'
import { H1 } from '@/components/text'
import { ArrowLeft, Plus } from 'phosphor-react'
import { useLists } from '@/hooks/lists'
import { LoadingComponent } from '@/components/loading/component/inext'
import { ButtonToCart } from '@/components/button-to-cart'
import { useRouter } from 'next/router'

type HeaderTypes = {
  title: string
  listId: string
  handleBack?: any
  handleCreateNewItem?: any
  amountTotalList: number
  valueTotalList: string
  renderComponent: 'list' | 'inTheCart'
}

export default function Header(props: HeaderTypes) {
  const { loading, lengthItemsFromCart } = useLists()

  const router = useRouter()

  return (
    <HeaderComponent>
      <div className="flex w-full items-center">
        <div className="flex p-2 mr-2 hover:opacity-50 rounded-full focus:opacity-50 ease-in duration-200">
          <ArrowLeft size={25} color="#fff" onClick={() => props.handleBack()} />
        </div>

        <div className="flex flex-col w-full justify-center items-center mr-5">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <H1 label={props.title} color="white" />
              <div className="font-normal text-sm text-white">
                <span> {`${props?.amountTotalList} Produtos | Total R$${props?.valueTotalList}`} </span>
              </div>
            </>
          )}
        </div>
      </div>

      {props.renderComponent === 'list' && (
        <div className="flex justify-center items-center w-1.5/5 min-w-max gap-5">
          <ButtonToCart lengthItems={lengthItemsFromCart} onClick={() => router.push(`/list/${props.listId}/cart`)} />
          <button
            type="button"
            className="flex w-8 h-8 justify-center items-center bg-white rounded-full hover:bg-white/70 ease-in duration-200"
            onClick={props.handleCreateNewItem}
          >
            <Plus size={20} className="text-primary" />
          </button>
        </div>
      )}
    </HeaderComponent>
  )
}
