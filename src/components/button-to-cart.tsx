import { ShoppingCartSimple } from 'phosphor-react'
import { useState } from 'react'
import Draggable from 'react-draggable'

type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  lengthItems: number
  onClick: any
}

export function ButtonToCart(props: ButtonTypes) {
  const [wasDraged, setWasDraged] = useState(false)

  const [onClickDipatch, setOnClickDipatch] = useState(false)

  function handleDrag(e: any) {
    setWasDraged(e.isTrusted)
  }

  function handleDragStop(e: any) {
    if (!!wasDraged) {
      // arrastou
    } else {
      // não arrastou apenas clicou
      setOnClickDipatch(true)
    }

    setWasDraged(false)
  }

  function handleClick() {
    props.onClick()
  }

  return (
    <div>
      <div className="fixed bottom-10 right-1/4 z-50">
        <Draggable
          handle=".handle"
          defaultPosition={{ x: 10, y: 10 }}
          grid={[25, 25]}
          scale={1}
          onDrag={handleDrag}
          onStop={handleDragStop}
        >
          <div>
            <button
              onClick={onClickDipatch ? handleClick : undefined}
              className="handle fixed bottom-10 right-10 z-50 hover:bottom-12 ease-in duration-300 "
            >
              <div className="flex w-16 h-16 rounded-full hover:bg-green-800 ease-in duration-300  bg-green-700 justify-center items-center shadow-2xl">
                <div className="flex absolute w-8 h-8 justify-center items-center -mt-12 -mr-12 z-10 text-white font-semibold text-xs p-1 bg-red-600 rounded-full">
                  {props.lengthItems}
                </div>
                <ShoppingCartSimple size={30} color="#fff" />
              </div>
            </button>
          </div>
        </Draggable>
      </div>
    </div>
  )
}
