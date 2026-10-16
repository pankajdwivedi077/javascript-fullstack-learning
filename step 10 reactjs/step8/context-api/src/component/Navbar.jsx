import  { useContext } from 'react'
import Nav2 from './Nav2'
import { ThemeDataContext } from '../context/ThemeContext';

const Navbar = () => {

  return (
    <div className='nav'>
        
        <Nav2  />
    </div>
  )
}

export default Navbar