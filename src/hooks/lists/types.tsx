import { ItemTypes } from '../items/types'

export interface ListTypes {
  id: number
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
  Item: ItemTypes[] | []
}
