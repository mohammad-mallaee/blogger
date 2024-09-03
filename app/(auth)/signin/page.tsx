import { GithubSignInButton, SignoutButton } from "@/app/components/SigninButtons";
import { auth } from "@/config.blog";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page() {
  if (!auth.enable)
    return notFound()
  const session = await getServerSession()
  return <main className="min-h-screen py-4 px-6 md:px-1 pt-2 pb-16 max-w-[740px] w-full">
    {session ? <div className="mt-8">
        <h1 className="text-2xl font-medium">You are already signed in.</h1>
        <SignoutButton className="mt-4" />
      </div>
      : <div className="mt-6">
        <h1 className="text-2xl font-medium">Signin to your account</h1>
        <h2 className="mt-1 text-on-background-variant">Loging in to your account grant you access to restricted posts.</h2>
        <GithubSignInButton className="mt-4" />
      </div>
    }
  </main >
}