import { useRouter } from 'next/router'
import { useLists } from '@/hooks/lists'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
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
  const { id } = router.query

  useEffect(() => {
    const inTheCart = 1
    const data = { id: Number(id), inTheCart } || { id: props.LIST_ID, inTheCart }
    featchListItems(data)
  }, [])

  useEffect(() => {
    if (closeModalItem) {
      const inTheCart = 1
      const data = { id: Number(id), inTheCart } || { id: props.LIST_ID, inTheCart }
      featchListItems(data)
    }
  }, [closeModalItem])

  function handleBack() {
    router.back()
  }

  function handleRemoveFromCart(id: number) {
    const data = { itemId: id, inTheCart: 0 }
    itemRemoveOrAddToCart(data)
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
        title="Produtos no carrinho"
        handleBack={handleBack}
        amountTotalList={amountTotalList}
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
  const cookie = parseCookies(context)

  return {
    props: {
      LIST_ID: cookie.LIST_ID,
    },
  }
}
