import { useState } from "react"
import { useContext } from "react"
import { CounterContext } from "./App8"

const Product8 = ({item}) => {

 const [addToCart, setAddToCart] = useState(false)

 const {cartItem, setCardItem} = useContext(CounterContext) 

  return (
    <div>
        <div>
            <h1>Name: {item.name}</h1>
            <h2>Price: {item.price}</h2>
            {
                addToCart ? <button onClick={()=>{setAddToCart(false), setCardItem(cartItem=>cartItem-1)}}>Remove</button>: <button onClick={()=>{setAddToCart(true), setCardItem(cartItem=>cartItem+1)}}>Add</button>
            }
        </div>
    </div>
  )
}

export default Product8