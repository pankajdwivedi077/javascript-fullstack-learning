import { useCallback, useMemo, useState } from "react"
import Sum from "./Sum"
import Post from "./Post"

const App5 = () => {

  const [count, setCount] = useState(0) 
  const [number, setNumber] = useState(100)

  // function calculatePrime(){
  //   let total = 0;
  //   if(number > 1)
  //     total++;

  //   for(let i=3; i<=number; i++){
  //     total++;
  //     for(let j=2; j<i; j++){
  //       if(i%j==0){
  //         total--;
  //         break;
  //       }
  //     }
  //   }
 
  //   return total;

  // }

  // function handleClick(){
  //   console.log("hello ji")
  // }

  const handleClick = useCallback(()=>{
    console.log("hello ji ", count)
  },[count])

  const prime = useMemo(()=>{
    let total = 0;
    if(number > 1)
      total++;

    for(let i=3; i<=number; i++){
      total++;
      for(let j=2; j<i; j++){
        if(i%j==0){
          total--;
          break;
        }
      }
    }
 
    return total;
  },[number])

  const obj = useMemo(()=>{
    return {name: "Bell", age: 14}
  },[])

  console.log("app5")
    
  return (
    <div>
      <h1>Counter: {count} </h1>
      <button onClick={()=>setCount(count+1)}>Increment</button>
      <h2>Current number: {number}</h2>
      <button onClick={()=>setNumber(number+100)}>Increment number</button>
      {/* <Sum number={1000} />     */}  {/* constant value or number is not changing */}
      
      <h3>Total prime number: {prime} </h3>
      <button onClick={handleClick} >click</button>
      <Sum number={number} />
      <Post value={obj} ></Post>
    </div>
  )
}

export default App5