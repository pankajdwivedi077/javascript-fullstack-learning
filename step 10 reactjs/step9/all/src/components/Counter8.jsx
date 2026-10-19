import { useContext } from "react"
import { CounterContext } from "./App8"

const Counter8 = () => {

   const {count, setCount} = useContext(CounterContext)    

  return (
    <div>
        <h1>Counter is: {count}</h1>
        <button onClick={()=>setCount(count=>count+1)}>increase</button>
        <button onClick={()=>setCount(count=>count-1)}>deacrease</button>
    </div>
  )
}

export default Counter8