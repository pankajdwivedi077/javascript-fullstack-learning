"use client"

import { useEffect } from "react"

export default function ErrorExampleUi({ error, retry }: {
  error: Error & { digest?: string }
  retry: () => void
} ){
  
  useEffect(()=>{
      // sent a report to your error logging service
  }, [error])

  return (
    <div>
        <p className="text-red-300">{error?.message || "An error occured"}</p>
    </div>
  )

}