import Link from "next/link"

export const metadata = {
  title: "Page Not Found"
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col m-auto py-6 px-4 md:px-2 gap-6 w-full max-w-[740px]">
      <h1 className="text-4xl">Not Found !</h1>
      <h2 className="text-xl">Looks like the page you are looking for is not here</h2>
      <p>If you are a visitor then you can go back to home page using <Link className="text-[--link]" href={'/'}>this</Link> link.
      If you are the owner then check the file name and headers then try again.</p>
    </main>
  )
}
