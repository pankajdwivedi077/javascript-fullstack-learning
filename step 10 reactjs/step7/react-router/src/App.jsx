import './App.css'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import Navbar2 from './components/Navbar2';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Men from './pages/Men';
import Women from './pages/Women';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import { useState } from 'react';

function App() {

  const [theme, setTheme] = useState('light')

  return (

    // <div>
    //   <Navbar />
    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //     <Route path='/about' element={<About />} />
    //     <Route path='/contact' element={<Contact />} />
    //     <Route path='/product' element={<Product />} />
    //   </Routes>
    // </div>

    <div className='h-screen bg-black text-white'>
      <Navbar2 />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About theme={theme} setTheme={setTheme} />} />
  
        <Route path='/courses' element={<Courses />} />

          {/* dynamic routing */}
          <Route path='/courses/:id' element={<CourseDetail />} />

         {/* Nested routing */}
        <Route path='/product' element={<Product />} >

        <Route path='men' element={<Men />} />
        <Route path='women' element={<Women />} />
        </Route>

      
        <Route path='*' element={<NotFound />} />

      </Routes>
      {theme}
      <Footer />
    </div>

  )
}

export default App
