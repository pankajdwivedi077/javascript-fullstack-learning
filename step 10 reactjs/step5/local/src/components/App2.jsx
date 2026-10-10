import axios from "axios";
import { useState } from "react";

const App2 = () => {

//   async function getData(){
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//     console.log(res)
//    } 

//  const getData = async () => {
//     const res  = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//     const data = await res.json()
//     console.log(data)
//  }

 const [data, setData] = useState(null);

 const getData = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    
    setData(res.data)
 }

  return (
    <div>
        <button onClick={getData}>Get Data</button>
        {data && (
        <div>
          <h1>{data.title}</h1>
        </div>
      )}
    </div>
  )
}

export default App2