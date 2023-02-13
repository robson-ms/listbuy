import Lottie from 'react-lottie-player'
import animation from './json.json'

interface CartTypes {
  menseger: string
}

export function CartVazio({ menseger }: CartTypes) {
  return (
    <div>
      <div className="flex  w-56 h-56">
        <Lottie loop animationData={animation} play />
      </div>
      <span className="flex w-full justify-center text-white font-normal ">{menseger}</span>
    </div>
  )
}
