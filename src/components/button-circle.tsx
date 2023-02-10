import classname from 'classnames'

type ButtonTypes = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  color: 'success' | 'danger' | 'delete'
  children: React.ReactNode
}

export function ButtonCircle(props: ButtonTypes) {
  let bgColor = ''

  if (props.color === 'delete') bgColor = 'hover:bg-red-500 bg-red-700 text-white h-10 px-4 text-white h-10 px-4'

  if (props.color === 'success') bgColor = 'hover:bg-green-600 bg-green-700 text-white h-10 px-4 text-white h-10 px-4'

  if (props.color === 'danger') bgColor = 'hover:bg-orange-400 bg-orange-500 text-white h-10 px-4'

  return (
    <button
      type="button"
      className={classname('flex w-8 h-8 justify-center items-center rounded-full ease-in duration-200', bgColor)}
      {...props}
    >
      <div>{props.children}</div>
    </button>
  )
}
