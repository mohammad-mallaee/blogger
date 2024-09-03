import { Suspense } from "react";
import AuthError from "./msg";
import { auth } from "@/config.blog";
import { notFound } from "next/navigation";

export default function Page() {
    if (!auth.enable)
        return notFound()

    return <Suspense fallback={<div></div>}>
        <AuthError />
    </Suspense>
}