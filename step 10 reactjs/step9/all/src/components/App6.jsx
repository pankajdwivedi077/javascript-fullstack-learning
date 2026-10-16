import { useRef, useState } from "react"
import Login from "./Login"
import Video from "./Video"

const App6 = () => {

  const [time, setTime] = useState(0) 

  const intervalIdTRef = useRef(null)

  function handleStart(){
    if(intervalIdTRef.current!=null){
        return;
    }
   intervalIdTRef.current = setInterval(()=>{
        setTime(time=>time+1)
    },1000)
  }

  function handleStop(){
    clearInterval(intervalIdTRef.current)
    intervalIdTRef.current = null
  }

  function reset(){
    clearInterval(intervalIdTRef.current)
    intervalIdTRef.current = null
    setTime(0)
    
  }
    
  return (
    <div>
        <h1>Stopwatch: {time}</h1>
        <div>
            <button onClick={handleStart}>start</button>
            <button onClick={handleStop}>stop</button>
            <button onClick={reset}>reset</button>
        </div>
        <Login />
        <Video />
    </div>
  )
}

export default App6