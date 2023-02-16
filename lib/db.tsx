import { prisma } from './prisma'

export interface Item {
  id: number
  title: string
  price: number
  amount: number
  valueTotal: number
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

export async function getAllLists(userId: string) {
  const data = await prisma.list.findMany({
    where: {
      userId,
    },
  })
  return data
}

export async function getList(id: string) {
  const data = await prisma.list.findUnique({
    where: {
      id: id,
    },
    include: {
      Item: true,
    },
  })
  return data
}
