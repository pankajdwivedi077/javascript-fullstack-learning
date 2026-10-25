import { Suspense } from "react"
import UseFetchDemo from "./use-fetch"

const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=10")
  return res.json()
}

const Demo1 = () => {
  const productsPromise = getProducts() // don't await it

  return (
    <div className="container mx-auto py-10 px-4">
      {/* ...other demos... */}
      <h2 className="text-4xl underline font-bold tracking-tight mt-11 mb-10">use</h2>
      <Suspense fallback={<p>Loading products...</p>}>
        <UseFetchDemo productPromiseVal={productsPromise} />
      </Suspense>
    </div>
  )
}

export default Demo1