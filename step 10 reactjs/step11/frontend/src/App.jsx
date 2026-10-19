import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  
    // const [products, error, loading] = customReactQuery('/api/products')

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')

      useEffect(()=>{

       const controller = new AbortController()  

   ;(async ()=> {

    try{

    setLoading(true)  
    setError(false)  
    const response = await axios.get(`api/products?search=`+search, {
      signal: controller.signal
    })
    console.log(response.data)
    setProducts(response.data)
    setLoading(false)

    }catch (error){

      if(axios.isCancel(error)){
        console.log(error.message)
        return;
      }
      setError(true)
      setLoading(false)
    }
   })()

   return ()=>{
    controller.abort()
   }

  },[search])
 
    if(error){
      return <h1>Something went wrong</h1>
    }

    if(loading){
      return <h1>Loading...</h1>
    }

  return (
    <>
     <h1>React</h1>
     <input type="text" placeholder='search' 
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
     />
     {/* {loading &&  (<h1>Loading..</h1>) } */}
     <h2>Number of products are: {products.length} </h2>
    </>
  )
}

export default App

const customReactQuery = (urlPath)=>{

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

   ;(async ()=> {

    try{

    setLoading(true)  
    setError(false)  
    const response = await axios.get(urlPath)
    console.log(response.data)
    setProducts(response.data)
    setLoading(false)

    }catch (error){

      setError(true)
      setLoading(false)
    }
   })()

  },[])

  return [
    products,
    error,
    loading
  ]

}