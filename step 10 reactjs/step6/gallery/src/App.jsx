import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [userData, setUserData] = useState([])

  const [index, setIndex] = useState(1)

  const getData = async () => {

   const res = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserData(res.data)
  }

  useEffect(()=>{
    getData()
  },[userData])

  let printUserData = 'No User Available'

  if(userData.length > 0){
    printUserData = userData.map(data=>(
      <div key={data.id} className='h-40 w-44 bg-white rounded-xl'>
        <img className='h-full object-cover' src={data.download_url} alt="" />
      </div>
    ))
  }

  return (
   <div className='bg-black overflow-auto h-screen text-white'>
    <h1>{index}</h1>
    <div className='flex flex-wrap gap-4'>
       {printUserData}
    </div>
    <div className='flex justify-center items-center p-4 gap-4'>
      <button
      onClick={()=>{
        if(index>1){
          setIndex(prev => prev-1)
        }
      }} 
      className='bg-amber-400 tex-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'>Previous</button>
      <button 
      onClick={()=>{
        setIndex(prev => prev+1)
      }}
      className='bg-amber-400 tex-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'>Next</button>
    </div>
   </div>
  )
}

export default App
