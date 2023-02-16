import { useRouter } from 'next/router'
import { useLists } from '@/hooks/lists'
import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Table from '../../table'
import Layout from '@/components/layout'
import Header from '../../header'
import { useItem } from '@/hooks/items'
import { Loading } from '@/components/loading'
import { maskCurrency } from '@/utils/mask'
import { ItemTypes } from '@/hooks/items/types'

export default function List(props: any) {
  const { featchListItems, listItems, loading } = useLists()
  const { itemRemoveOrAddToCart, closeModalItem } = useItem()

  const router = useRouter()

  useEffect(() => {
    featchListItems({ id: props.LIST_ID, inTheCart: 1 })
  }, [])

  useEffect(() => {
    if (closeModalItem) {
      featchListItems({ id: props.LIST_ID, inTheCart: 1 })
    }
  }, [closeModalItem])

  function handleBack() {
    router.back()
  }

  function handleRemoveFromCart(id: string) {
    const data = { itemId: id, inTheCart: 0 }
    itemRemoveOrAddToCart(data)
  }

  const valueTotalList = maskCurrency(
    String(
      // @ts-ignore
      listItems?.Item?.reduce((accumulator: any, object: ItemTypes) => {
        return accumulator + object.valueTotal
      }, 0)
    )
  )

  return (
    <Layout>
      <Header
        title="Produtos no carrinho"
        handleBack={handleBack}
        amountTotalList={listItems.Item?.length}
        valueTotalList={valueTotalList}
        renderComponent="inTheCart"
      />

      <div className="w-full h-full max-w-screen-md bg-default overflow-auto drop-shadow-lg">
        {loading ? (
          <Loading />
        ) : (
          <Table item={listItems.Item} handleRemoveFromCart={handleRemoveFromCart} renderComponent="inTheCart" />
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.query.id

  return {
    props: {
      LIST_ID: id,
    },
  }
}
