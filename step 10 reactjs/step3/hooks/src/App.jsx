import { useState } from 'react'
import './App.css'
import FormHandling1 from './FormHandling1';
import App2 from './App2';

function App() {

  // const btnClicked = (e)=>{
  //  console.log(e)
  // }

 

  // function increaseNum(){
  //   setNum(num+1)
  // }

  // function decreaseNum(){
  //   setNum(num-1)
  // }

  // function jump5Num(){
  //   setNum(num+5)
  // }

  const [num, setNum] = useState(10);

  const [user, setUser] = useState({name: 'bell', age: 14})

  const [arr, setArr] = useState([10,20,30])

  const btnClicked = ()=>{
    
    setNum(prev=>(prev+1))

    // batch update
    // setNum(prev=>(prev+1))
    // setNum(prev=>(prev+1))

    console.log(num)

    const newUser = {...user};
    newUser.name = 'Aman'
    setUser(newUser)

    const newArr = [...arr]
    newArr.push(40)
    setArr(newArr)
  }

  return (

  //  <div>
  //   <h1>App Bell</h1>
  //   <input onChange={function(e){
  //     btnClicked(e.target.value)
  //   }}/>
  //  </div>

    // <div>
    //   <div onMouseMove={(e)=>{
    //     console.log(e.clientX)
    //   }} className='box'>

    //   </div>
    // </div>

    // <div>
    //   <h1>{num}</h1>
    //  <button onClick={increaseNum}>increase</button>
    //  <button onClick={decreaseNum}>decrease</button>
    //  <button onClick={jump5Num}>Jump by 5</button>
    // </div>

    // <div>
    //   <h1>{num}</h1>
    //   <h1>{user.name} {user.age}</h1>
    //   <h1>{arr}</h1>
    //   <button onClick={btnClicked}>increase</button>
    // </div>

    <div>
       {/* <FormHandling1 /> */}
       <App2 />
    </div>

  )
}

export default App
