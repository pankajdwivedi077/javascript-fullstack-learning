"use client"

import { createContext, use } from "react"

const productPromiseVal =  fetch("https://dummyjson.com/products?limit=10").then((res)=>res.json())

export const ProductsContext = createContext(null)

export function ProductsProvider({children}){
    const data = use(productPromiseVal)
    return <ProductsContext.Provider value={data}>
           {children}
         </ProductsContext.Provider>
}