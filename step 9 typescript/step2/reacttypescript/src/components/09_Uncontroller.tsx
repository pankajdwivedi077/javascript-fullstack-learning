import { useRef, useState, type SubmitEvent } from "react"

function getString(fd: FormData, key: string): string | null{
    const result = fd.get(key)
    return typeof result === "string" ? result : null
}

function getNumber(fd: FormData, key: string): number | null{
   const extractStringValueFirst = getString(fd,key)
   if(extractStringValueFirst === null) return null
   const convertToNumber = Number(extractStringValueFirst)
   return Number.isFinite(convertToNumber) ? convertToNumber : null
}

export function UncontrolledForm(){

   const [val, setVal] = useState<string | undefined>(undefined); 

   const formRef = useRef<HTMLFormElement | null>(null)

   function handleFomrSubmit(event:SubmitEvent<HTMLFormElement>){
      event.preventDefault()
      const fd = new FormData(event.currentTarget)
      const extractName = getString(fd, "name") ?? "No Name"
      const extractNumber = getNumber(fd, "age")
   }

    return (
        <form onSubmit={handleFomrSubmit} ref={formRef}>
            <input name="name" defaultValue="guest"/>
            <input type="number" name="age" defaultValue="18" min={0} />
            <button type="submit">Submit</button>
            <input value={val} />  
            {/* react warning changing from uncontrolled to controlled */}
        </form>
    )
}