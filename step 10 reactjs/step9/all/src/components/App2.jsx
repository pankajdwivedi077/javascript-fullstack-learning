import { useState } from "react"


const App2 = () => {

  const [count, setCount] = useState(0)

  return (
    <div>
        <p>This is the counter for react App</p>
        <h1>Counter:{count}</h1>
        <button onClick={()=> setCount(count+1)} >inc</button>
        <button onClick={()=> {
            setCount(count-1)
        }} >dec</button>
    </div>
  )
}

export default App2