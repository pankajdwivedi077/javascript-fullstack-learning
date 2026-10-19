import { useState } from "react"

const App7 = () => {

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div>
         <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
         </div>
        <div>
         <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} />
         </div>
        <div>
         <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
         </div>
         <button>Submit</button>
      </form>
    </div>
  )
}

export default App7