import Button from '@/components/Button'
import { H2, Span } from '@/components/text'
import { useLists } from '@/hooks/lists'
import dayjs from 'dayjs'
import { ListTypes } from 'lib/db'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

interface TypesList {
  list: ListTypes
}

export default function ListComponent({ list }: TypesList) {
  const { deleteLists } = useLists()
  const router = useRouter()
  function handleDelete(id: number) {
    deleteLists(id)
  }

  function handleBuy(data: number) {
    const id = data.toString()
    router.push(`/list/${id}`)
    setCookie(null, 'LIST_ID', id, {
      maxAge: 60 * 60,
      path: '/',
    })
  }

  const createdAt = dayjs(list.createdAt).format('DD/MM/YYYY')

  return (
    <div className="w-full flex justify-center items-center overflow-auto">
      <div className="flex w-full px-4 py-4 justify-between items-center bg-white mb-1 ">
        <div>
          <H2 color="black" label={list.title} className="-mb-1" />
          <Span color="black" label={`Criado: ${createdAt}`} />
        </div>

        <div className="flex gap-4">
          <Button typeBtn="button" label="Camprar" color="success" variant="text" onClick={() => handleBuy(list.id)} />
          <Button
            typeBtn="button"
            label="Deletar"
            color="danger"
            variant="text"
            onClick={() => handleDelete(list.id)}
          />
        </div>
      </div>
    </div>
  )
}
