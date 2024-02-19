'use client'

export const metadata = {
  title: "Unexpected Error"
}

export default function Error() {
  return (
    <main className="flex min-h-screen flex-col m-auto py-6 px-4 md:px-2 gap-6 w-full max-w-2xl">
      <h1 className="text-4xl">Unexpected Error!</h1>
      <h2 className="text-xl">Something went wrong here and it is unknown</h2>
      <p>If you are a visitor then simply wait for some moments and try again. If you are the owner then you can check the
        logs for more information.
      </p>
    </main>
  )
}
