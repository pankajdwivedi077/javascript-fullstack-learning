import {  Link } from "react-router";

const Navbar = () => {
  return (
   <div className='nav'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
  )
}

export default Navbar