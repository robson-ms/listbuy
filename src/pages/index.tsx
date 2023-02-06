import Header from '@/components/Header'
import { useLists } from '@/hooks/lists'
import { getAllLists, ListTypes } from 'lib/db'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ListComponent from './components/home/list-components'
import ListModalCreate from './components/home/list-modal-create'
import ListModalDeleteConfirme from './components/home/list-modal-delete-confirme'

interface TypesList {
  lists: ListTypes[]
}

export default function Home({ lists }: TypesList) {
  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false)
  const [isVisibleModalDelete, setIsVisibleModalDelete] = useState(false)
  const [listId, setListId] = useState(0)
  const [listName, setListName] = useState('')
  const { loadingHome } = useLists()

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  useEffect(() => {
    refreshData()
  }, [loadingHome])

  function handleOpenModal() {
    setIsVisibleModalCreate(!isVisibleModalCreate)
  }

  function handleDelete(list: ListTypes) {
    setIsVisibleModalDelete(!isVisibleModalDelete)
    setListId(list.id)
    setListName(list.title)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex w-screen h-screen flex-col justify-center items-center bg-neutral-100">
          <Header handleOpenModal={handleOpenModal} />

          <div className="w-full h-full py-2 max-w-screen-md bg-default overflow-auto drop-shadow-lg">
            {loadingHome ? (
              <div className="flex w-full h-full justify-center items-center">
                <span>Carregando ...</span>
              </div>
            ) : (
              lists.map(list => <ListComponent list={list} key={list.id} handleDelete={() => handleDelete(list)} />)
            )}
          </div>
          {isVisibleModalCreate && (
            <ListModalCreate
              isVisibleModalCreate={isVisibleModalDelete}
              setIsVisibleModalCreate={setIsVisibleModalCreate}
            />
          )}

          {isVisibleModalDelete && (
            <ListModalDeleteConfirme
              isVisible={isVisibleModalDelete}
              setIsVisible={setIsVisibleModalDelete}
              listId={listId}
              listName={listName}
            />
          )}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const data = await getAllLists()
  const lists = JSON.parse(JSON.stringify(data))

  return { props: { lists } }
}