import { ShoppingCartSimple } from 'phosphor-react'

type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  lengthItems: number
}

export function ButtonToCart(props: ButtonTypes) {
  return (
    <button className="fixed bottom-10 right-10 z-50 hover:bottom-12 ease-in duration-300 " {...props}>
      <div className="flex w-16 h-16 rounded-full hover:bg-green-800 ease-in duration-300  bg-green-700 justify-center items-center shadow-2xl">
        <div className="flex absolute w-8 h-8 justify-center items-center -mt-12 -mr-12 z-10 text-white font-semibold text-xs p-1 bg-red-600 rounded-full">
          {props.lengthItems}
        </div>
        <ShoppingCartSimple size={30} color="#fff" />
      </div>
    </button>
  )
}
