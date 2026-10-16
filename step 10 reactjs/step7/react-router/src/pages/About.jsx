import { useNavigate } from "react-router-dom"

const About = ({ theme, setTheme }) => {

  const navigate = useNavigate()

 const btnClicked = ()=>{
  console.log('btn')
  navigate('/')
 }

 const changeThem = ()=> {
   console.log(theme, 'th')
   setTheme('dark')
 }

  return (
    <div className="flex justify-between">
      <button onClick={btnClicked} className="cursor-pointer">Return to Home page</button>
      <button onClick={changeThem} className="cursor-pointer">Change theme {theme}</button>
      <h1>About</h1>
    </div>
  )
}

export default About