import Body from "./Body"
import Footer from "./Footer"
import Header from "./Header"
import { useState, createContext } from "react"

export const CounterContext = createContext()

const App8 = () => {

  const [count, setCount] = useState(0)  
  const [cartItem, setCardItem] = useState(0)

  return (
    <div>
        <CounterContext value={{count, setCount, cartItem, setCardItem}}>
        <Header />
        <Body />
        <Footer />
        </CounterContext>
    </div>
  )
}

export default App8