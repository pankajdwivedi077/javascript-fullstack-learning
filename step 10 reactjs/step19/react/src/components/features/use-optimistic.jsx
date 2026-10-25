"use client"
import { incrementCount } from "@/actions/submitFormAction"
import { useOptimistic, useState, useTransition } from "react"

export default function UseOptimisticDemo(){

    const [count,setCount] = useState(0)

    const [isPending, startTransition] = useTransition()

    const [optimisticState, setOptimistic] = useOptimistic(
        count, (state) => state + 1 // increase count instantly
    )

    const handleIncrement = async () => {
        startTransition(()=>{
            setOptimistic()
        })
        try {
             const newCount = await incrementCount(count)
              setCount(newCount);
        } catch (error) {
            setCount(count)
        }
    }

    return (
        <div className="p-5 border rounded text-center">
            <h2 className="text-lg font-bold">Optimistic counter</h2>
            <p className="text-lg font-semibold">{optimisticState}</p>
            {
                isPending && <p>Updating...</p>
            }
            <button
            onClick={handleIncrement}
            className="mt-3 p-2 bg-blue-500 text-white rounded"
            >
            +1
            </button>
        </div>
    )
}