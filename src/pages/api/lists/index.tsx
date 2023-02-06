import { prisma } from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const { id } = query

  if (method === 'GET') {
    if (id) {
      const list = await prisma.list.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          Item: true,
        },
      })
      return res.status(200).json({
        data: list,
      })
    } else {
      const lists = await prisma.list.findMany()
      return res.status(200).json({
        data: lists,
      })
    }
  } else if (method === 'POST') {
    const { title } = req.body

    const list = await prisma.list.create({
      data: {
        title,
        isDone: false,
      },
    })
    return res.status(200).json({
      data: list,
    })
  } else if (method === 'PATCH') {
    const { title, isDone } = req.body
    const { id } = req.query

    const list = await prisma.list.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        isDone,
      },
    })
    return res.status(200).json({
      data: list,
    })
  } else if (method === 'DELETE') {
    const { id } = req.query

    const list = await prisma.list.delete({
      where: {
        id: Number(id),
      },
    })
    return res.status(200).json({
      data: list,
    })
  } else {
    return res.status(200).json('Method not allowed')
  }
}