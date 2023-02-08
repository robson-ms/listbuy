import { ReactNode } from 'react'

type ModalTypes = {
  children: ReactNode
}

export default function Modal(props: ModalTypes) {
  return (
    <div className=" fixed top-0 left-0 right-0 z-50 w-full h-full bg-black/60 flex items-center justify-center ">
      <div className="flex flex-col w-80 h-auto px-4 py-4 bg-white items-center justify-center drop-shadow-lg rounded-lg">
        {props.children}
      </div>
    </div>
  )
}
