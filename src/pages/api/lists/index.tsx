import { prisma } from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const { id, inTheCart } = query

  if (method === 'GET') {
    if (id && inTheCart) {
      const list = await prisma.list.findUnique({
        where: {
          id: String(id),
        },
        include: {
          Item: {
            where: {
              inTheCart: Number(inTheCart),
            },
            orderBy: {
              title: 'asc',
            },
          },
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
    const { title, isDone, userId } = req.body

    const list = await prisma.list.create({
      data: {
        userId,
        title,
        isDone,
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
        id: String(id),
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
        id: String(id),
      },
    })
    return res.status(200).json({
      data: list,
    })
  } else {
    return res.status(200).json('Method not allowed')
  }
}
