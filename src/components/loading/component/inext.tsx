export function LoadingComponent() {
  return (
    <div className="max-w-sm w-full ">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-default rounded"></div>

          <div className="h-4 bg-default rounded"></div>
        </div>
      </div>
    </div>
  )
}
