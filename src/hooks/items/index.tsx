import api from '@/services/api'
import React, { createContext, useCallback, useState, useContext, ReactNode } from 'react'
import { ItemTypes } from './types'

export interface ItemContextData {
  item: ItemTypes
  loading: boolean
  success: boolean
  itemId: number | undefined
  setItemId: any
  postItem(data: ItemPostTypes): Promise<void>
  deleteItem(id: number): Promise<void>
  featchItem(id: number): Promise<void>
}

interface ItemProviderTypes {
  children: ReactNode
}

interface ItemPostTypes {
  title: string
  amount: string
  price: string
  totalValue: string
  listId: number
}

const ListsContext = createContext<ItemContextData>({} as ItemContextData)

const ItemProvider = ({ children }: ItemProviderTypes) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [itemId, setItemId] = useState<number | undefined>()
  const [item, setItem] = useState<ItemTypes>({} as ItemTypes)

  const featchItem = useCallback(async (id: number) => {
    try {
      setLoading(true)
      const res = await api.get('/api/items', {
        params: {
          id,
        },
      })
      setItem(res.data)
      if (res.status < 300) {
        setSuccess(true)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const postItem = useCallback(async (data: ItemPostTypes) => {
    try {
      setLoading(true)
      const res = await api.post('/api/items', {
        title: data.title.toString(),
        price: data.price.toString(),
        amount: Number(data.amount),
        valueTotal: Number(data.totalValue),
        listId: Number(data.listId),
      })
      if (res.status < 300) {
        setSuccess(true)
      }
      console.log('RES', res)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteItem = useCallback(async (id: number) => {
    try {
      setLoading(true)
      await api.delete(`/api/lists`, {
        params: {
          id,
        },
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <ListsContext.Provider
      value={{
        itemId,
        setItemId,
        item,
        success,
        loading,
        postItem,
        deleteItem,
        featchItem,
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}

function useItem(): ItemContextData {
  const context = useContext(ListsContext)

  if (!context) {
    throw new Error(' useItem must be used within an ItemProvider ')
  }
  return context
}
export { ItemProvider, useItem }