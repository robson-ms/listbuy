import classNames from 'classnames'
import { Eye, EyeSlash } from 'phosphor-react'
import React, { useState } from 'react'

type InputTypes = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  height?: 40
}

export function InputPassword(props: InputTypes) {
  const [typeInputPassword, setTypeInputPassword] = useState('password')
  let height = ''
  if (props.height === 40) {
    height = 'h-10'
  } else {
    height = 'h-12'
  }

  function seePassword() {
    if (typeInputPassword === 'password') {
      setTypeInputPassword('text')
    } else {
      setTypeInputPassword('password')
    }
  }

  return (
    <div className="flex relative">
      <input
        type={typeInputPassword}
        className={classNames(
          'w-full border-2 pl-2 pr-12  border-neutral-300 rounded-lg text-neutral-700 text-base focus:border-1 focus:outline-none focus:border-default  focus:ring-default',
          height
        )}
        {...props}
      />
      <div className="cursor-pointer absolute right-4 top-2 focus:outline-none focus:border-default focus:ring-default">
        {typeInputPassword === 'password' ? (
          <EyeSlash size={22} color="#2e2e2e" onClick={seePassword} className="" />
        ) : (
          <Eye size={22} color="#2e2e2e" onClick={seePassword} className="" />
        )}
      </div>
    </div>
  )
}
