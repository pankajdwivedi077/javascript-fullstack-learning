"use client"

import { useContext } from "react"
import { ProductsContext } from "./dataProvider"

export default function ProductsConsumer(){
    const data = useContext(ProductsContext)
    return <div>
      <h2>Context ex</h2>
      <ul className="mt-5">
        {
            data?.products.map(productItem => (
                <li key={productItem.id}>{productItem.title}</li>
            ))
        }
      </ul>
   </div>
}