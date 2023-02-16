import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials: any, req) {
        const { email, password } = credentials as { email: string; password: string }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) {
          throw new Error('E-mail não cadastro!')
        }

        const checkPassword = await compare(credentials.password, String(user.password))

        if (!checkPassword || user.email !== credentials.email) {
          throw new Error('E-mail ou senha está incorreto!')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    async session({ session, token }: any) {
      session = {
        ...session,
        user: {
          id: token.id,
          ...session.user,
        },
      }

      return session
    },
  },

  secret: 'XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=',
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
})
