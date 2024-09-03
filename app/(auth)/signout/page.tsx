import { SignoutButton } from "@/app/components/SigninButtons";

export default function Page() {
    return <main className="min-h-screen py-4 px-6 md:px-1 pt-2 pb-16 max-w-[740px] w-full">
        <div className="gap-4 mt-8">
            <h1 className="text-2xl font-medium">Confirm your action</h1>
            <SignoutButton className="mt-3 px-16"/>
        </div>
    </main>
}