"use client"

import { useRouter } from "next/navigation"

export default function NotFoundPage(){

    const router = useRouter();

    return (
        <div>
            <h1>The page you are looking for is not exists</h1>
            <button onClick={()=> router.push("/")} className="bg-black p-5 text-white">Go to homepage</button>
        </div>
    )
}