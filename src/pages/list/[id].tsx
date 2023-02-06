import { H1 } from '@/components/text'
import Table from '../components/list/table'
import { useRouter } from 'next/router'
import { useLists } from '@/hooks/lists'
import { useEffect, useState } from 'react'
import { ArrowLeft, Plus } from 'phosphor-react'
import Loading from '@/components/Loading'
import ModalEditeOrCreate from './list-modal-edite-or-create'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

export default function List(props: any) {
  const { featchListItems, listItems, loading } = useLists()
  const [isVisible, setIsVisible] = useState(false)
  const [typeEditeOrCreate, setTypeEditeOrCreate] = useState('asd')

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    featchListItems(Number(id) | props.LIST_ID)
  }, [])

  function handleBack() {
    localStorage.removeItem('LIST_ID')
    router.push('/')
  }

  function handleCreateNewItem() {
    setIsVisible(!isVisible)
    setTypeEditeOrCreate('create')
  }

  return (
    <div className="flex w-screen h-screen flex-col items-center bg-neutral-100">
      <div className="max-w-screen-md w-full h-16 flex bg-primary p-4 py-2 justify-between items-center drop-shadow-md">
        <div className="flex">
          <div className="mr-2">
            <ArrowLeft size={25} color="#fff" onClick={() => handleBack()} />
          </div>
          <H1 label={`${listItems?.title ? listItems?.title : ''}`} color="white" />
        </div>
        <button
          type="button"
          className="flex w-8 h-8 justify-center items-center bg-white rounded-full"
          onClick={handleCreateNewItem}
        >
          <Plus size={20} className="text-primary" />
        </button>
      </div>

      <div className="w-full h-full max-w-screen-md bg-default overflow-auto">
        {loading ? (
          <Loading text="Carregando..." />
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
    </div>
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
