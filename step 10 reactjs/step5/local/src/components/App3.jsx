import { useEffect, useState } from "react"

const App3 = () => {

  const [num, setNum] = useState(0)
  const [num2, setNum2] = useState(10)

  useEffect(()=>{
    console.log('useEffect is running')
  },[num])

  return (
    <div>
        <h1>{num}</h1>
        <h1>{num2}</h1>
        <button onClick={()=>{
          setNum(prev=>prev+1)
        }} onDoubleClick={()=>{
            setNum2(prev=>prev+2)
        }}>Click</button>
    </div>
  )
} // useEffect

export default App3