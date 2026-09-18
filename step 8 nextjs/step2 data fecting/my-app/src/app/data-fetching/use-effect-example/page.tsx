"use client"

interface Product{
    id: number;
    title: string;
    price: number;
    category: string;
}

interface ProductsResponse{
    products: Product[];
    total: number
}

import { useEffect, useState } from "react"

export default function UseEffect(){

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Product[]>([]);

    async function fetchListOfProducts(){
       try{
        setIsLoading(true)
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();
        if(result){
            setIsLoading(false)
            setData(result?.products)
        }
       }catch(e){
        console.log(e)
       }finally{
        setIsLoading(false)
       }
    }

    useEffect(()=> {
         fetchListOfProducts();
    }, [])

    if(isLoading) return <h1>Loading...</h1>

    return (
        <div>
            <h1>Use effect example</h1>
            <div className="flex flex-col gap-2">
                {data.map(product=>(
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