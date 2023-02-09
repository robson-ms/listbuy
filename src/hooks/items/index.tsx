import api from '@/services/api'
import React, { createContext, useCallback, useState, useContext, ReactNode } from 'react'
import { toast } from 'react-toastify'
import { ItemTypes } from './types'

interface ItemProviderTypes {
  children: ReactNode
}

export interface ItemPostTypes {
  title: string
  amount: number
  price: number
  valueTotal: number
  listId: number
}

export interface ItemUpdateTypes {
  itemId: number
  title: string
  amount: number
  price: number
  valueTotal: number
  listId: number
}

export interface ItemContextData {
  item: ItemTypes
  loading: boolean
  success: boolean
  itemId: number | undefined
  setItemId: any
  setItem: any
  closeModalItem: boolean | undefined
  setCloseModalItem: any
  postItem(data: ItemPostTypes): Promise<void>
  updateItem(data: ItemUpdateTypes): Promise<void>
  deleteItem(id: number): Promise<void>
}

const ListsContext = createContext<ItemContextData>({} as ItemContextData)

const ItemProvider = ({ children }: ItemProviderTypes) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [itemId, setItemId] = useState<number | undefined>()
  const [item, setItem] = useState<ItemTypes>({} as ItemTypes)
  const [closeModalItem, setCloseModalItem] = useState<boolean | undefined>()

  const postItem = useCallback(async (data: ItemPostTypes) => {
    const load = toast.loading('Carregando...')

    try {
      const res = await api.post('/api/items', {
        title: String(data.title),
        price: Number(data.price),
        amount: Number(data.amount),
        valueTotal: Number(data.valueTotal),
        listId: Number(data.listId),
      })

      if (res.status < 300) {
        setCloseModalItem(true)
      }

      toast.update(load, { render: 'Cadastro com sucesso', type: 'success', isLoading: false, autoClose: 2000 })
    } catch (err) {
      toast.update(load, { render: 'Erro ao cadastrar', type: 'error', isLoading: false, autoClose: 2000 })
      console.log(err)
    }
  }, [])

  const updateItem = useCallback(async (data: ItemUpdateTypes) => {
    setCloseModalItem(false)
    const load = toast.loading('Carregando...')
    try {
      const res = await api.patch(`/api/items?id=${data.itemId}`, {
        title: String(data.title),
        price: Number(data.price),
        amount: Number(data.amount),
        valueTotal: Number(data.valueTotal),
        listId: Number(data.listId),
      })
      if (res.status === 200) {
        setCloseModalItem(true)
      }

      toast.update(load, {
        render: 'Produto atualizado com sucesso',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
    } catch (err) {
      toast.update(load, { render: 'Erro ao atualizar', type: 'error', isLoading: false, autoClose: 2000 })
      console.log(err)
    }
  }, [])

  const deleteItem = useCallback(async (id: number) => {
    const load = toast.loading('Carregando...')
    try {
      const res = await api.delete(`/api/items`, {
        params: {
          id,
        },
      })

      if (res.status === 200) {
        setCloseModalItem(true)
      }

      toast.update(load, {
        render: 'Produto apagado com sucesso',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
    } catch (err) {
      toast.update(load, { render: 'Erro ao apagar', type: 'error', isLoading: false, autoClose: 2000 })
      console.log(err)
    }
  }, [])

  return (
    <ListsContext.Provider
      value={{
        loading,
        itemId,
        closeModalItem,
        item,
        success,
        setItemId,
        setItem,
        postItem,
        deleteItem,
        updateItem,
        setCloseModalItem,
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
