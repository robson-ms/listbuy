import { ReactNode } from 'react'
import { ListsProvider } from './lists'
import { ItemProvider } from './items'

interface ProviderTypes {
  children: ReactNode
}

export const AppProvider = ({ children }: ProviderTypes) => (
  <ListsProvider>
    <ItemProvider>{children}</ItemProvider>
  </ListsProvider>
)
