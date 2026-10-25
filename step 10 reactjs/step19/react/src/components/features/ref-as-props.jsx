"use client"

import { useRef } from "react";

function CustomInput({ref}){
    return <input ref={ref} placeholder="enter your name" className="border p-4 rounded" />
}

function RefAsPropsDemo(){

  const inputRef = useRef(null)

  const handleFocus = ()=>{
    if(inputRef.current){
        inputRef.current.focus()
    }
  }

  return (
    <div>
        <CustomInput ref={inputRef} />
        <button onClick={handleFocus} className="mt-3 p-2 bg-blue-500 text-white rounded">Focus Input</button>
    </div>
  )
}

export default RefAsPropsDemo;