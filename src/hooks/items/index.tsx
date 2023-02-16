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
  listId: string
}

interface ItemUpdateTypes {
  inTheCart?: boolean
  itemId: string
  title?: string
  amount?: number
  price?: number
  valueTotal?: number
}

interface ItemRemoveOrAddToCartTypes {
  inTheCart: number
  itemId: string
}

export interface ItemContextData {
  item: ItemTypes
  loading: boolean
  success: boolean
  itemId: string | undefined
  setItemId: any
  setItem: any
  closeModalItem: boolean | undefined
  setCloseModalItem: any
  postItem(data: ItemPostTypes): Promise<void>
  updateItem(data: ItemUpdateTypes): Promise<void>
  deleteItem(id: string): Promise<void>
  itemRemoveOrAddToCart(data: ItemRemoveOrAddToCartTypes): Promise<void>
}

const ListsContext = createContext<ItemContextData>({} as ItemContextData)

const ItemProvider = ({ children }: ItemProviderTypes) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [itemId, setItemId] = useState<string | undefined>()
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
        listId: String(data.listId),
        inTheCart: 0,
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

  const itemRemoveOrAddToCart = useCallback(async (data: ItemRemoveOrAddToCartTypes) => {
    setCloseModalItem(false)
    const load = toast.loading('Carregando...')
    try {
      const res = await api.patch(`/api/items?id=${data.itemId}`, {
        inTheCart: data.inTheCart,
      })

      if (res.status === 200) {
        setCloseModalItem(true)
      }

      toast.update(load, {
        render: 'Produto adicionado ao carrinho',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
    } catch (err) {
      toast.update(load, { render: 'Erro ao adicionar', type: 'error', isLoading: false, autoClose: 2000 })
      console.log(err)
    }
  }, [])

  const deleteItem = useCallback(async (id: string) => {
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
        itemRemoveOrAddToCart,
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
