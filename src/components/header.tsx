interface headerTypes {
  children: React.ReactNode
}

export function HeaderComponent({ children }: headerTypes) {
  return (
    <div className=" w-full h-20 flex bg-primary items-center justify-center drop-shadow-md">
      <div className="max-w-screen-md w-full flex px-4 py-2 items-center justify-between">{children}</div>
    </div>
  )
}
