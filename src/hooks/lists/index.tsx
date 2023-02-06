import api from '@/services/api'
import React, { createContext, useCallback, useState, useContext, ReactNode } from 'react'
import { ListTypes } from './types'

export interface ListsContextData {
  listItems: ListTypes
  error: any
  loading: boolean
  loadingHome: boolean
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
  const [loadingHome, setLoadingHome] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

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
    try {
      setLoadingHome(true)
      await api.post('/api/lists', {
        title: title,
      })
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setLoadingHome(false)
    }
  }, [])

  const deleteLists = useCallback(async (id: number) => {
    try {
      setLoadingHome(true)
      await api.delete(`/api/lists`, {
        params: {
          id,
        },
      })
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setLoadingHome(false)
    }
  }, [])

  return (
    <ListsContext.Provider
      value={{
        listItems,
        error,
        loading,
        loadingHome,
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
