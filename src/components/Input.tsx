import classNames from 'classnames'
import React from 'react'

type InputTypes = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  height?: 40
}

export default function Input(props: InputTypes) {
  let height = ''
  if (props.height === 40) {
    height = 'h-10'
  } else {
    height = 'h-12'
  }

  return (
    <input
      className={classNames(
        'w-full border-2 px-2  border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-default  focus:ring-default',
        height
      )}
      {...props}
    />
  )
}
