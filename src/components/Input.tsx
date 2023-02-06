import classNames from 'classnames'
import React from 'react'

type InputTypes = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  height?: 36
}

export default function Input(props: InputTypes) {
  let height = ''
  if (props.height === 36) {
    height = 'h-9'
  } else {
    height = 'h-12'
  }

  return (
    <input
      className={classNames(
        'w-full border-2 px-4  border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-primary  focus:ring-primary',
        height
      )}
      {...props}
    />
  )
}
