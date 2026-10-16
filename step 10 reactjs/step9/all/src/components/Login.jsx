import { useRef, useState } from "react"


const Login = () => {

//   const [email, setEmail] = useState("") 
//   const [password, setPassword] = useState("") 

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  console.log("render")

  function handleSubmit(e){
    e.preventDefault()
    console.log(emailRef.current.value, passwordRef.current.value)
  }
    
  return (
    <div>
        {/* <form onSubmit={handleSubmit}>
           <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
           <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
           <button type="submit">submit</button>
        </form> */}
        <form onSubmit={handleSubmit}>
           <input type="email" ref={emailRef} />
           <input type="password" ref={passwordRef} />
           <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default Login