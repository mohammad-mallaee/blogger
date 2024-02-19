import ErrorBoundary from '@/app/components/ErrorBoundary'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<CompileErrorComponent />}>
            {children}
        </ErrorBoundary>
    )

}

function CompileErrorComponent() {
    return <main className="flex min-h-screen flex-col m-auto py-6 gap-6 w-full max-w-2xl">
        <h1 className="text-4xl">Compile Error !</h1>
        <h2 className="text-xl">There was an issue while compiling this page.</h2>
        <p>If you are a visitor then you can wait for the owner to fix this issue.
            if you are the owner then you can check the server or production logs for more information.
        </p>
    </main>
}