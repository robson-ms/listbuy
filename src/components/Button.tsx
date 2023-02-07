import React from 'react'
import classname from 'classnames'

type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  color?: 'success' | 'danger'
  label: string
  variant?: 'text'
  typeBtn: 'button' | 'submit'
}

export default function Button(props: ButtonTypes) {
  let bgColor = ''

  if (props.color === 'success') {
    bgColor = 'hover:bg-green-600 bg-green-700 text-white h-10 px-4 bg-green-700 text-white h-10 px-4'
  } else if (props.color === 'danger') {
    bgColor = 'hover:bg-orange-400 bg-orange-500 text-white h-10 px-4'
  } else if (props.variant === 'text' && props.color === 'success') {
    bgColor = 'hover:text-green-500 bg-transparent text-green-700'
  } else if (props.variant === 'text' && props.color === 'danger') {
    bgColor = 'hover:text-orange-300 bg-transparent text-orange-500'
  } else {
    bgColor = 'hover:bg-neutral-400 bg-neutral-500 h-10 px-4'
  }

  return (
    <button
      type={props.typeBtn}
      className={classname('flex w-full justify-center items-center text-white font-emibold rounded-lg', bgColor)}
      {...props}
    >
      {props.label}
    </button>
  )
}
