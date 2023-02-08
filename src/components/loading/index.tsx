import Lottie from 'lottie-react-web'
import animation from './json.json'

export function Loading() {
  return (
    <div>
      <div className="mt-60 h-14">
        <Lottie options={{ animationData: animation }} />
      </div>
    </div>
  )
}
