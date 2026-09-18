import Link from "next/link";
import React from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode} ){
    return (
      <div>
        <header>
            <nav>
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/contact"}>Contact</Link>
            </nav>
        </header>
        <main>
            {children}
        </main>
      </div>
    )
}