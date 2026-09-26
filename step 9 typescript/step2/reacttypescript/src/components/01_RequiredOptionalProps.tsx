import type { ReactNode } from "react";

interface UserCardProps{
  id: string;
  name?: string;
  subtitle?: ReactNode
}

export default function UserCard({id, name, subtitle}: UserCardProps){

  const dispalyName = name ?? "Guest"

  return (
   <div>
     <strong>#{id}</strong>
     <p>{dispalyName}</p>
     {
        subtitle? <p>{subtitle}</p> : null
     }
   </div>
  )
}

