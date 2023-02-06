import React, { useState, FormEvent, ReactNode } from 'react'
import classNames from 'classnames'
import Button from './Button'
import Input from './Input'

type ModalTypes = {
  isVisible: boolean
  children: ReactNode
}

export default function Modal(props: ModalTypes) {
  return (
    <div
      className={classNames(
        props.isVisible ? '' : 'hidden',
        'flex w-screen h-screen justify-center items-center bg-black/40 absolute z-50'
      )}
    >
      <div className="flex flex-col w-80 h-auto px-4 py-4 bg-white items-center justify-center drop-shadow-lg rounded-lg">
        {props.children}
      </div>
    </div>
  )
}
