import { Link, Outlet } from "react-router-dom"


const Product = () => {
  return (
    <div>
      <div className="flex justify-center gap-10 py-4">
        <Link to="/product/men" >Men</Link>
        <Link to="/product/women" >Women</Link>
      </div>
      <h1>
       Product
      </h1>
      <Outlet />
      </div>
  )
}

export default Product