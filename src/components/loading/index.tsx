import Lottie from 'react-lottie-player'
import animation from './json.json'

export function Loading() {
  return (
    <div className="flex mt-60 justify-center items-center">
      <div>
        <Lottie loop animationData={animation} play style={{ width: 150, height: 150 }} />
      </div>
    </div>
  )
}
