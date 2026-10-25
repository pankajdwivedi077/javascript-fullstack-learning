"use client"

import { useActionStateAction } from "@/actions/submitFormAction"
import { useActionState } from "react"

export default function UseActionStateDemo(){

    // state -> handle success or error state
    // dispatchAction -> function tigger the server action
    // isPending -> state

    const [state, dispatchAction, isPending] = useActionState(useActionStateAction, null)

    return (
        <div className="p-5 border rounded">
        <h2 className="text-lg font-bold">
            React Server action handling form submission
        </h2>
        <form action={dispatchAction} className="space-y-3">
          
            <label className="block">Email</label>
            <input type="email"
             name="email"
             placeholder="enter email"
             required
             className="border p-2 w-full"
            />
            <button disabled={isPending} type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
        {state && <p>{state.error ? `Error: ${state.error}`: `Success: Email added` }</p> }
      
    </div>
    )
}