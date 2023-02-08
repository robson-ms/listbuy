import Lottie from 'lottie-react-web'
import animation from './json.json'

interface CartTypes {
  menseger: string
}

export function CartVazio({ menseger }: CartTypes) {
  return (
    <div>
      <div className="flex  w-56 h-56">
        <Lottie options={{ animationData: animation }} />
      </div>
      <span className="flex w-full justify-center text-white font-normal ">{menseger}</span>
    </div>
  )
}
