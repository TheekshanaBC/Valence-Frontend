export default function ExplorerPlaceholder() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Blockchain Explorer</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          This is a placeholder for the Blockchain Explorer. It will connect to the node endpoints to fetch the latest blocks and transactions.
        </p>
      </div>
    </div>
  )
}
