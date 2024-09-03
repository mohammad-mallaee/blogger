'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error') || 'Default'
    return <main className="min-h-screen py-4 px-6 md:px-1 pt-2 pb-16 max-w-[740px] w-full">
        {error === "AccessDenied"
            ? <div className="mt-6">
                <h1 className="text-2xl font-medium">Access Denied</h1>
                <div className="mt-2">
                    Your login was successfull but you don't have access to
                    restricted content of this website.
                    <br />
                    If this should not be the case, contact the administrator.
                    <br />
                    <Link className="text-link font-bold block mt-4" href={"/"}>Go back home page</Link>
                </div>
            </div>
            : <div className="mt-6">
                <h1 className="text-2xl font-medium">Unexpected Error - {decodeURI(error.toString())}</h1>
                <div className="mt-2">
                    An expected error happend while processing the request.
                    <br />
                    Try aggin later and if the problem persists, contact the administrator.
                    <Link className="text-link font-bold block mt-4" href={"/"}>Go back home page</Link>
                </div>
            </div>
        }
    </main >
}