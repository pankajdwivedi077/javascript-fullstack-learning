import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserDashboardLayout({children}: { children: React.ReactNode }){

   const session = await auth.api.getSession({
    headers: await headers()
   })

   if(!session) redirect("/login")

    if(session && session.user.role === "admin") redirect("/admin/assert-approval")

    return <main className="flex-1 p-4 lg:p-6">
        {children}
    </main>
}