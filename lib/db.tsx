import { prisma } from './prisma'

export interface Item {
  id: number
  title: string
  price: string
  amount: number
  valueTotal: string
  createdAt: string
  updatedAt: string
  listId: number
  list: ListTypes[]
}

export interface ListTypes {
  id: number
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
  Item: Item[]
}

export async function getAllLists() {
  const data = await prisma.list.findMany()
  return data
}

export async function getList(id: number) {
  const data = await prisma.list.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Item: true,
    },
  })
  return data
}
