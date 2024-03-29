import React from 'react'
import classname from 'classnames'

type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  color: 'success' | 'danger' | 'default'
  label: string
  variant?: 'text'
  typeBtn: 'button' | 'submit'
  disabled?: boolean | undefined
}

export default function Button(props: ButtonTypes) {
  let bgColor = ''
  let cursor = ''

  if (props.color === 'default') bgColor = 'hover:bg-primary/90 bg-primary text-white h-10 px-4 text-white h-10 px-4'

  if (props.color === 'success') bgColor = 'hover:bg-green-600 bg-green-700 text-white h-10 px-4 text-white h-10 px-4'

  if (props.color === 'danger') bgColor = 'hover:bg-orange-400 bg-orange-500 text-white h-10 px-4'

  if (props.variant === 'text' && props.color === 'success')
    bgColor = 'hover:text-green-500 bg-transparent text-green-700'

  if (props.variant === 'text' && props.color === 'danger')
    bgColor = 'hover:text-orange-300 bg-transparent text-orange-500'

  if (props.disabled) {
    cursor = 'cursor-not-allowed'
  }

  return (
    <button
      type={props.typeBtn}
      className={classname(
        'flex w-full justify-center items-center text-white font-emibold rounded-lg ease-in duration-200',
        bgColor,
        cursor
      )}
      {...props}
    >
      {props.label}
    </button>
  )
}
