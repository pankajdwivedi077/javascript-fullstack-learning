"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Profile ()  {

  const router = useRouter();
  const pathname = usePathname(); // give current pathname
  const searchParams = useSearchParams();

  console.log(router);
  console.log(searchParams.get("name"), searchParams);

  const handleNavigate = ()=>{
    router.push("/");
  }

  return (
   <div>
    <h1>Profile components</h1>
    <button onClick={handleNavigate}>Navigate to home page</button>
   </div>
  )
}
