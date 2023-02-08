import Button from '@/components/button'
import { H2, Span } from '@/components/text'
import dayjs from 'dayjs'
import { ListTypes } from 'lib/db'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

interface TypesList {
  list: ListTypes
  handleDelete: any
}

export default function ListComponent({ list, handleDelete }: TypesList) {
  const router = useRouter()
  function handleDeleteConfirme(id: number) {
    handleDelete(id)
  }

  function handleBuy(listId: number) {
    const id = listId.toString()
    router.push(`/list/${id}`)

    setCookie(null, 'LIST_ID', id, {
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    })
  }

  const createdAt = dayjs(list.createdAt).format('DD/MM/YYYY')

  return (
    <div className="w-full flex justify-center items-center overflow-auto">
      <div className="flex w-full px-4 py-4 justify-between items-center bg-white mb-1 ">
        <div>
          <div className="-mb-5">
            <H2 color="black" label={list.title} />
          </div>
          <Span color="black" label={`Criado: ${createdAt}`} />
        </div>

        <div className="flex gap-4">
          <Button typeBtn="button" label="Camprar" color="success" variant="text" onClick={() => handleBuy(list.id)} />
          <Button
            typeBtn="button"
            label="Deletar"
            color="danger"
            variant="text"
            onClick={() => handleDeleteConfirme(list.id)}
          />
        </div>
      </div>
    </div>
  )
}
