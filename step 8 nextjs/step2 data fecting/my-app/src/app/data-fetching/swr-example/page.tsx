"use client"

import useSWR from "swr";

interface Product{
    id: number;
    title: string;
    price: number;
    category: string;
}

const fetcher = (url:string)=> fetch(url).then(res=>res.json())

export default function Swr(){

    const { data, error, isLoading, mutate } = useSWR("https://dummyjson.com/products", fetcher, {
        revalidateOnFocus: true,
        refreshInterval: 30000,
        errorRetryCount: 3
    })

    if(isLoading) return <h1>Loading...</h1>

    if(error) return <h1>{error.message}</h1>

    const handleRefresh = ()=>{
        mutate()
    }

    return (
        <div>
            <h1>Swr example</h1>
             <button onClick={handleRefresh}>refresh</button>
                <div className="flex flex-col gap-2">
                {data?.products.map((product: Product)=>(
                  <div key={product.id}>
                     <h3>{product.title}</h3>
                     <p>{product.price}</p>
                     <p>{product.category}</p>
                  </div>
                ))}
            </div>
        </div>
    )
}