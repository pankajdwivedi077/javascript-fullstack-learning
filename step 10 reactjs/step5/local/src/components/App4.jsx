import { useEffect, useState } from "react"

const App4 = () => {

  const [a, setA] = useState(0)  
  const [b, setB] = useState(0)  

  function aChanging(){
   console.log('a value change')
  }  

  function bChanging(){
    console.log('b value change')
  } 
  
  useEffect(()=>{
    aChanging()
    console.log('useeffect is running')
  },[a])

  return (
    <div>
       <h1>A is {a}</h1> 
       <h1>B is {b}</h1> 
       <button onClick={()=>{
        setA(prev => prev +1)
       }}>change a</button>
       <button onClick={()=>{
        setB(prev => prev-1)
       }}>change b</button>
    </div>
  )
}

export default App4