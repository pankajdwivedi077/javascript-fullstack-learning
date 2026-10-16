import { useEffect, useState } from "react"

const Clock = () => {

  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [show, setShow] = useState(true)  

  useEffect(()=>{

    if(!show){
        return;
    }

    const id = setInterval(()=>{
    setTime(new Date().toLocaleTimeString())
  },1000)

  return ()=>{
    clearInterval(id)
  }

  },[show])

  return (
    <>
       <button onClick={()=>{setShow(!show)}}>{show ? "hide": "show"}</button>
       {
        show && <h1>Current Time: {time} </h1> 
       }
    </>
  )
}

export default Clock