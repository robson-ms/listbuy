import { AppProvider } from '@/hooks'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <AppProvider>
          <Component {...pageProps} />
          <ToastContainer position="top-right" closeOnClick theme="light" />
        </AppProvider>
      </SessionProvider>
    </main>
  )
}
