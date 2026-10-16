import {  Link } from "react-router";

const Navbar2 = () => {
  return (
    <div className="flex items-center py-4 px-8 bg-cyan-900 justify-between">
      <h2 className="text-xl font-bold">Bell</h2>
      <div className="flex gap-8">
          <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Product</Link>
        <Link to="/courses">Courses</Link>
      </div>
    </div>
  )
}

export default Navbar2