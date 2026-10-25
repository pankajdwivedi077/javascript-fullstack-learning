"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { useFormStatusAction } from "@/actions/submitFormAction"
import { useFormStatus } from "react-dom"

export default function UseFormStatusActionDemo(){

    const [message, setMessage] = useState('')

      const handleSubmit = async (event) => {
         event.preventDefault()
         const formData = new FormData(event.target)
         const formDataObject = Object.fromEntries(formData.entries())
         console.log(formData, formDataObject)
         const result = await useFormStatusAction(formDataObject)
         if(result.error){
            setMessage(`Error: ${result.error}`)
         }else{
            setMessage(`Success! User ${result.firstName} added.`)
         }
      }

      return (
        <div className="p-5 border rounded">
            <h2 className="text-lg font-bold">
                Disable Button with `useFormStatus()`
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input type="email" 
                 name="email"
                 placeholder="enter email"
                 required
                 className="border p-2 w-full"
                />
                <SubmitButton />
            </form>
            {message && <p className="mt-2">{message}</p> }
        </div>
      )

}

function SubmitButton(){

    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type="submit" className="p-2 bg-blue-500 text-white rounded" >
            {pending ? "Submit...please wait": "Submit" }
        </Button>
    )
}