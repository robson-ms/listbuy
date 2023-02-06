import classNames from 'classnames'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

type LabelTypes = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  label: string
  color: 'white' | 'black'
}

function fontColor(color: string) {
  let fontColor = ''
  color === 'white' ? (fontColor = 'text-white') : (fontColor = 'text-neutral-700')
  return fontColor
}

export function H1(props: LabelTypes) {
  return (
    <h1 className={classNames('font-bold text-xl', fontColor(props.color))} {...props}>
      {props.label}
    </h1>
  )
}

export function H2(props: LabelTypes) {
  return (
    <h2 className={classNames('text-neutral-700 font-bold text-base mb-4', fontColor(props.color))} {...props}>
      {props.label}
    </h2>
  )
}

export function Span(props: LabelTypes) {
  return (
    <span className={classNames('font-normal text-xs text-neutral-500', fontColor(props.color))} {...props}>
      {props.label}
    </span>
  )
}
