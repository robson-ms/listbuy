import { prisma } from 'lib/prisma'
import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'POST') {
    const { name, email, password, confirmePassword } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (user) {
      return res.status(200).json('E-mail já cadastrado!')
    } else if (password !== confirmePassword) {
      return res.status(200).json('Senhas não são identicas!')
    } else {
      const hashedPassword = await hash(password, 16)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      return res.status(200).json({
        data: user,
      })
    }
  }
}
