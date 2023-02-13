import React from 'react'

type LayoutTypes = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutTypes) {
  return (
    <div className="flex absolute w-screen h-screen flex-col justify-center items-center overflow-hidden">
      <div className="flex flex-col w-full h-full  items-center drop-shadow-lg">{children}</div>
    </div>
  )
}
