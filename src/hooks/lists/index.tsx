import api from '@/services/api'
import { useRouter } from 'next/router'
import React, { createContext, useCallback, useState, useContext, ReactNode } from 'react'
import { toast } from 'react-toastify'
import { ListTypes } from './types'

export interface ListsContextData {
  listItems: ListTypes
  error: any
  loading: boolean
  closeModal: boolean
  postLists(title: string): Promise<void>
  deleteLists(id: number): Promise<void>
  featchListItems(id: number): Promise<void>
}

interface ListProviderTypes {
  children: ReactNode
}

const ListsContext = createContext<ListsContextData>({} as ListsContextData)

const ListsProvider = ({ children }: ListProviderTypes) => {
  const [listItems, setListItems] = useState<ListTypes>({} as ListTypes)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [closeModal, setCloseModal] = useState(false)

  const router = useRouter()

  const refreshData = () => {
    router.replace('/')
  }

  const featchListItems = useCallback(async (id: number) => {
    try {
      setLoading(true)
      const res = await api.get(`/api/lists`, {
        params: {
          id,
        },
      })
      setListItems(res.data.data)
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const postLists = useCallback(async (title: string) => {
    const load = toast.loading('Carregando...')
    try {
      const res = await api.post('/api/lists', {
        title: title,
      })
      if (res.status < 300) {
        setCloseModal(true)
        refreshData()
      }

      toast.update(load, { render: 'Cadastro com sucesso', type: 'success', isLoading: false, autoClose: 3000 })
    } catch (err) {
      toast.update(load, { render: 'Erro ao cadastrar', type: 'error', isLoading: false, autoClose: 3000 })
      console.log(err)
    }
  }, [])

  const deleteLists = useCallback(async (id: number) => {
    const load = toast.loading('Carregando...')
    try {
      const res = await api.delete(`/api/lists`, {
        params: {
          id,
        },
      })

      if (res.status < 300) {
        setCloseModal(true)
        refreshData()
      }

      toast.update(load, { render: 'Lista apagada com sucesso', type: 'success', isLoading: false, autoClose: 3000 })
    } catch (err) {
      console.log(err)
      toast.update(load, { render: 'Erro ao cadastrar', type: 'error', isLoading: false, autoClose: 3000 })
      setError(err)
    }
  }, [])

  return (
    <ListsContext.Provider
      value={{
        listItems,
        error,
        loading,
        closeModal,
        postLists,
        deleteLists,
        featchListItems,
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}

function useLists(): ListsContextData {
  const context = useContext(ListsContext)

  if (!context) {
    throw new Error(' useLists must be used within an listsProvider ')
  }
  return context
}
export { ListsProvider, useLists }
