import { useEffect, useState } from "react";


const App1 = () => {

  const [users, setUsers] = useState([])

  const [count, setCount] = useState(30)

  function handleChange(e){
    setName(e.target.value.toUpperCase())
  }

  useEffect(()=>{
    async function githubProfile(){
      const res = await fetch(`https://api.github.com/users?per_page=${count}`);
      const data = await res.json()
      setUsers(data)
    }
    githubProfile()
  },[count])

  return (
    <div>
      <h1>Github User</h1>
      {/* <input value={count} type="number" onChange={handleChange}></input> */}
      <input value={count} type="number" onChange={(e)=>{
         setCount(e.target.value)
      }}></input>
      <div style={{display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap", gap:"10px"}}>
         {
          users.map(user=>(
            <img key={user.id} src={user.avatar_url} height={"100px"} width={"100px"} />
          ))
         }
      </div>
    </div>
  )
}

export default App1