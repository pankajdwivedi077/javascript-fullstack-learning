"use client"

import { submitFormAction } from "@/actions/submitFormAction"
import { useState } from "react"

export const ActionsExample = () => {

  const [message, setMessage] = useState("")

  const handleSubmit = async (event) => {
     event.preventDefault()
     const formData = new FormData(event.target)
     const formDataObject = Object.fromEntries(formData.entries())
     console.log(formData, formDataObject)
     const result = await submitFormAction(formDataObject)
     if(result.error){
        setMessage(`Error: ${result.error}`)
     }else{
        setMessage(`Success! User ${result.firstName} added.`)
     }
  }

  return (
    <div className="p-5 border rounded">
        <h2 className="text-lg font-bold">
            React Server action handling form submission
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">First Name:</label>
            <input type="text"
             name="firstName"
             placeholder="enter name"
             required
             className="border p-2 w-full"
            />
            <label className="block">Email</label>
            <input type="email"
             name="email"
             placeholder="enter email"
             required
             className="border p-2 w-full"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
        {message && <p className="mt-2">{message}</p> }
    </div>
  )
}
