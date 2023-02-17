import { ShoppingCartSimple } from 'phosphor-react'

type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  lengthItems: number
}

export function ButtonToCart(props: ButtonTypes) {
  return (
    <button className="relative ease-in duration-200 " {...props}>
      <div className="flex w-10 h-10 rounded-full hover:bg-default ease-in duration-300  justify-center items-center shadow-2xl">
        <div className="flex absolute w-5 h-5 justify-center items-center top-0 right-0 z-10 text-white font-semibold text-xs p-1 bg-red-600 rounded-full">
          {props.lengthItems}
        </div>
        <ShoppingCartSimple size={30} color="#fff" />
      </div>
    </button>
  )
}
