import { useState, useEffect, useTransition } from "react"

const generateLargeData = () => {
    return Array.from({ length: 5000 }, (_, i) => ({
        id: i+1,
        name: `Product ${i + 1}`,
        price: (Math.random() * 100).toFixed(2),
    }))
}

const App1 = () => {

  const [products, setProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])
  const [sortBy, setSortBy] = useState("default")
  const [isPending, startTransition] = useTransition()
  
  useEffect(()=>{
    const data = generateLargeData();
    setProducts(data)
    setSortedProducts(data)
  },[])

 

  const handleSort = (type) => {

    setSortBy(type)

    startTransition(()=>{
    let sortedData = [...products];

    if(type === "priceLow"){
    sortedData.sort((a,b)=>a.price - b.price)
    }else if(type === "priceHigh"){
        sortedData.sort((a,b)=>b.price - a.price)
    }else{
    sortedData = [...products]
    }
    setSortedProducts(sortedData)
    })


  }

  return (
    <div className="p-5">
       <h1 className="text-lg font-bold">Large product list (5000+ items) </h1>
       <div className="my-3 flex gap-2">
        <button className="p-2 border rounded" onClick={()=>handleSort("priceLow")}>
            Sort by price (low to high)
        </button>
        <button className="p-2 border rounded" onClick={()=>handleSort("priceHigh")}>
            Sort by price (high to low)
        </button>
        <button className="p-2 border rounded" onClick={()=>handleSort("default")}>
            Reset
        </button>
       </div>

        { isPending && <p className="text-gray-500">Sorting large dataset</p> }

       <ul className="mt-4 h-80 overflow-auto border p-2">
        {sortedProducts.map((product) => (
            <li key={product.id} className="p-1">
                <strong>{product.name}</strong> - ${product.price}
            </li>
        ))}
       </ul>

    </div>
  )
}

export default App1