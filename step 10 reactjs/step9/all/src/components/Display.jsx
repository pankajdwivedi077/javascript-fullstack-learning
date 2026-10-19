import { useContext } from "react"
import { CounterContext } from "./App8"

const Display = () => {

  const {count} = useContext(CounterContext)  

  return (
    <div>
        <h1>count value: {count} </h1>
    </div>
  )
}

export default Display