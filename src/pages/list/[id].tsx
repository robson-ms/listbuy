import { useRouter } from 'next/router'
import { useLists } from '@/hooks/lists'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import ModalEditeOrCreate from './list-modal-edite-or-create'
import Table from './table'
import Layout from '@/components/layout'
import Header from './header'
import { useItem } from '@/hooks/items'
import { Loading } from '@/components/loading'
import { ItemTypes } from '@/hooks/items/types'
import { maskCurrency } from '@/utils/mask'
import { ButtonToCart } from '@/components/button-to-cart'

export default function List(props: any) {
  const { featchListItems, listItems, loading, lengthItemsFromCart } = useLists()
  const { closeModalItem, setCloseModalItem, setItem } = useItem()
  const [isVisible, setIsVisible] = useState(false)
  const [typeEditeOrCreate, setTypeEditeOrCreate] = useState('')

  const router = useRouter()

  useEffect(() => {
    featchListItems({ id: props.LIST_ID, inTheCart: 0 })
  }, [])

  useEffect(() => {
    if (closeModalItem) {
      featchListItems({ id: props.LIST_ID, inTheCart: 0 })
    }
  }, [closeModalItem])

  function handleBack() {
    router.push('/')
  }

  function handleCreateNewItem() {
    setItem({})
    setCloseModalItem(false)
    setIsVisible(!isVisible)
    setTypeEditeOrCreate('create')
  }

  const valueTotalList = maskCurrency(
    String(
      // @ts-ignore
      listItems?.Item?.reduce((amount: any, object: ItemTypes) => {
        return amount + object.valueTotal
      }, 0)
    )
  )

  return (
    <Layout>
      <Header
        handleCreateNewItem={handleCreateNewItem}
        handleBack={handleBack}
        amountTotalList={listItems.Item?.length}
        valueTotalList={valueTotalList}
        renderComponent="list"
        title={listItems.title}
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
  const id = context.query.id

  return {
    props: {
      LIST_ID: id,
    },
  }
}
