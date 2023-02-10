import { useRouter } from 'next/router'
import { useLists } from '@/hooks/lists'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import ModalEditeOrCreate from './list-modal-edite-or-create'
import Table from './table'
import Layout from '@/components/layout'
import Header from './header'
import { useItem } from '@/hooks/items'
import { Loading } from '@/components/loading'
import { ItemTypes } from '@/hooks/items/types'
import { maskCurrency } from '@/utils/mask'
import { ShoppingCartSimple } from 'phosphor-react'
import { ButtonToCart } from '@/components/button-to-cart'

export default function List(props: any) {
  const { featchListItems, listItems, loading, lengthItemsFromCart } = useLists()
  const { closeModalItem, setCloseModalItem, setItem } = useItem()
  const [isVisible, setIsVisible] = useState(false)
  const [typeEditeOrCreate, setTypeEditeOrCreate] = useState('')

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const inTheCart = 0
    const data = { id: Number(id), inTheCart } || { id: props.LIST_ID, inTheCart }
    featchListItems(data)
  }, [])

  useEffect(() => {
    if (closeModalItem) {
      const inTheCart = 0
      const data = { id: Number(id), inTheCart } || { id: props.LIST_ID, inTheCart }
      featchListItems(data)
    }
  }, [closeModalItem])

  function handleBack() {
    router.back()
  }

  function handleCreateNewItem() {
    setItem({})
    setCloseModalItem(false)
    setIsVisible(!isVisible)
    setTypeEditeOrCreate('create')
  }

  const amountTotalList = listItems?.Item?.reduce((accumulator: any, object: ItemTypes) => {
    return accumulator + object.amount
  }, 0)

  const valueTotalList = maskCurrency(
    String(
      listItems?.Item?.reduce((accumulator: any, object: ItemTypes) => {
        return accumulator + object.valueTotal
      }, 0)
    )
  )

  return (
    <Layout>
      <Header
        handleCreateNewItem={handleCreateNewItem}
        handleBack={handleBack}
        amountTotalList={amountTotalList}
        valueTotalList={valueTotalList}
        renderComponent="list"
      />

      <div className="w-full h-full max-w-screen-md bg-default overflow-auto drop-shadow-lg mt-1">
        {loading ? (
          <Loading />
        ) : (
          <Table
            item={listItems?.Item}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setTypeEditeOrCreate={setTypeEditeOrCreate}
            renderComponent="list"
          />
        )}
      </div>
      {isVisible && (
        <ModalEditeOrCreate
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          listId={listItems?.id}
          type={typeEditeOrCreate}
        />
      )}
      <ButtonToCart lengthItems={lengthItemsFromCart} onClick={() => router.push(`/list/${props.LIST_ID}/cart`)} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cookie = parseCookies(context)

  return {
    props: {
      LIST_ID: cookie.LIST_ID,
    },
  }
}
