import { useState } from "react"
import Counting from "./Counting"

const App4 = () => {

  const [clocks, setClocks] = useState(["A", "B", "C"])  

  function handleChange (){
    setClocks(["D", ...clocks])
  }

  return (
    <div>
        <button onClick={handleChange}>Increasement Clocks</button>
        <div>
           {clocks.map(clock=>( <Counting key={clock} name="raju" /> ))}
        </div>
    </div>
  )
}

export default App4