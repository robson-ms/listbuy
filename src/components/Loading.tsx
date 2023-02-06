import { ReactNode } from 'react'

interface TextTypes {
  text: ReactNode
}
export default function Loading({ text }: TextTypes) {
  return (
    <div className="flex w-full h-full justify-center items-center bg-white">
      <span>{text}</span>
    </div>
  )
}
