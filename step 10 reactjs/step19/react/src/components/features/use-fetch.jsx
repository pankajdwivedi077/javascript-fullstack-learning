"use client"

import { use } from "react"

const UseFetchDemo = ({productPromiseVal}) => {

  const data = use(productPromiseVal)
  console.log(data)

  return (
   <div>
      <h2>Product List</h2>
      <ul className="mt-5">
        {
            data?.products.map(productItem => (
                <li key={productItem.id}>{productItem.title}</li>
            ))
        }
      </ul>
   </div>
  )
}

export default UseFetchDemo