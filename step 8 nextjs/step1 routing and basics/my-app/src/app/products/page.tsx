import Link from "next/link"

export default function Products(){

   const products = [
    {
        id: "1",
        name: "mobile",
        price: 400
    },
    {
        id: "2",
        name: "laptop",
        price: 80000
    },
    {
        id: "3",
        name: "watch",
        price: 100
    },
   ]

    return(
        <div>
          <h1 className="text-2xl font-bold mb-4">products</h1>
          <div className="grid gap-4">
             {
                products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                        <Link href={`/products/${product.id}`}>
                         View Details
                        </Link>
                    </div>
                ))
             }
          </div>
        </div>
    )
}
