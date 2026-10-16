import { useState } from "react"
import Food from "./Food"

const App3 = () => {

  const [foodItems, setFooditems] = useState(["Apple", "Organge", "Banana"])  

  const handleChange = ()=>{
    setFooditems(["Mango", ...foodItems])
  }

  return (
    <div>
        <button onClick={handleChange}>Increament</button>
        <Food foods={foodItems} />
    </div>
  )
}

export default App3