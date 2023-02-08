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

export default function List(props: any) {
  const { featchListItems, listItems, loading } = useLists()
  const { setCloseModalItem, setItem } = useItem()
  const [isVisible, setIsVisible] = useState(false)
  const [typeEditeOrCreate, setTypeEditeOrCreate] = useState('')

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    featchListItems(Number(id) | props.LIST_ID)
  }, [])

  function handleBack() {
    router.back()
  }

  function handleCreateNewItem() {
    setItem({})
    setCloseModalItem(false)
    setIsVisible(!isVisible)
    setTypeEditeOrCreate('create')
  }

  return (
    <Layout>
      <Header handleCreateNewItem={handleCreateNewItem} handleBack={handleBack} />

      <div className="w-full h-full max-w-screen-md bg-default overflow-auto drop-shadow-lg">
        {loading ? (
          <Loading />
        ) : (
          <Table
            item={listItems?.Item}
            handleEdit={() => console.log()}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setTypeEditeOrCreate={setTypeEditeOrCreate}
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
