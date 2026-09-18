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

async function getProducts() : Promise<ProductsResponse> {
  const res = await fetch('https://dummyjson.com/products', {
    // cache: "no-store"
    // cache: "force-cache"
    cache:"reload"
  });

  if(!res.ok){
    throw new Error("Failed to fetch products");
  }
  return res.json()
}

export default async function ServerSideFetchExample(){

    const products = await getProducts();

    return (
        <div>
            <h1>Server side data fecth</h1>
            <h3>{products.total} total</h3>
            <div className="flex flex-col gap-2">
            {
                products?.products?.map(product => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                        <p>{product.category}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}