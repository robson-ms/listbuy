import { ItemTypes } from '../items/types'

export interface ListTypes {
  id: string
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
  userId: string
  Item: ItemTypes[] | []
}
