import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface ChangingValueType {
  changingValue: any
}

export const useRefresh = (changingValue: ChangingValueType) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
    setIsRefreshing(true)
  }

  useEffect(() => {
    setIsRefreshing(false)
  }, [changingValue])

  return { isRefreshing, refreshData }
}
