// this layout only applies tom /dashboard/**

import Link from "next/link";
import React from "react";

export default function CommonAdminDashboardLayout({ children }: {children: React.ReactNode} ){
   return(
    <div>
        <div className="flex">
            <aside className="w-64 p-4 border-r">
                <h2>Dashboard</h2>
                <nav>
                    <ul>
                        <li>
                            <Link href={"/dashboard"}>Dashboard home</Link>
                        </li>
                        <li>
                            <Link href={"/dashboard/analystics"}>Dashboard Analystics</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="flex p-5">{children}</div>
        </div>
    </div>
   )
}