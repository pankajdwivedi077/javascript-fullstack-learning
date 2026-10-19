import { useState } from "react"
import Counter8 from "./Counter8"
import Product8 from "./Product8"

const Body = () => {

  const [items, setItems] = useState([{id:1,name:"Malik",price:100},{id:2,name:"Protein",price:200}])

  return (
    <div>
        <h1>Body</h1>
        {/* <Counter8  /> */}
        <div>
            {
                items.map(item=>(<Product8 key={item.id} item={item} />))
            }
        </div>
    </div>
  )
}

export default Body