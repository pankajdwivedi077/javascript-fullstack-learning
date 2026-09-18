"use client"

import { cn } from "cn";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client"
import UserMenu from "../auth/user-menu";
import ThemeToggke from "../theme/theme-toggle";

function Header(){

    const {data: session, isPending} = useSession()

   const navItems = [
    {
    label: "Home", href: "/"
   },
    {
    label: "Create  post", href: "/post/create"
   },
]

    return <header className="border-b bg-background sticky top-0 z-10">
         <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-6"> 
                <Link className="font-bold text-xl" href="/">
                 Nextjs Blog
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    {
                        navItems.map(item => (
                            <Link key={item.href} href={item.href} className={cn("text-sm font-medium transition-colors hover:text-primary")}>
                             {item.label}
                            </Link>
                        ))
                    }
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md-block">
                    {/*  */}
                </div>
                <ThemeToggke />
                <div className="flex items-center gap-2"> 
                   {
                    isPending ? null :
                    session?.user ? (
                    <UserMenu user={session?.user} />
                    ) :  <Button variant={"default"} asChild>
                        <Link href="/auth">
                         Login
                        </Link>
                    </Button>
                   }
                </div>
              </div>
         </div>
    </header>
}
 
export default Header;