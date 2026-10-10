import { useState } from "react"

const App2 = () => {

    const [title, setTitle] = useState('')

    const submitHandler = (e)=>{
    e.preventDefault()
    console.log('submit')
    setTitle('')
  }  

  return (
    <div>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input type="text" placeholder="Enter your name" value={title} onChange={(e) => {
                setTitle(e.target.value)
                console.log(e.target.value)
            }} />
            <button>Submit</button>
        </form>
    </div>
  )
}
// two way binding
export default App2