import { prisma } from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    const { id } = req.query
    if (id) {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(id),
        },
      })
      if (item === null) {
        return res.status(404).json('Produto não encontrado')
      } else {
        return res.status(200).json({
          data: item,
        })
      }
    } else {
      const items = await prisma.item.findMany()
      return res.status(200).json({
        data: items,
      })
    }
  } else if (method === 'POST') {
    const { title, price, amount, valueTotal, listId, inTheCart } = req.body

    const item = await prisma.item.create({
      data: {
        title,
        price,
        amount,
        valueTotal,
        listId,
        inTheCart,
      },
    })

    return res.status(200).json({
      data: item,
    })
  } else if (method === 'PATCH') {
    const { id } = req.query
    const { title, price, amount, valueTotal } = req.body

    const item = await prisma.item.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        price,
        amount,
        valueTotal,
      },
    })

    return res.status(200).json({
      data: item,
    })
  } else if (method === 'DELETE') {
    const { id } = req.query

    const item = await prisma.item.delete({
      where: {
        id: Number(id),
      },
    })

    return res.status(200).json({
      data: item,
    })
  } else {
    return res.status(200).json('Method not allowed')
  }
}
