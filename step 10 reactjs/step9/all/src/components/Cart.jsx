import { useContext } from "react"
import { CounterContext } from "./App8"

const Cart = () => {

   const {cartItem} = useContext(CounterContext) 
    
  return (
    <div>
        <h1>Total items: {cartItem} </h1>
    </div>
  )
}

export default Cart