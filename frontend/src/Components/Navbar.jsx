import React from 'react'
import './AllCss.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex items-center w-full h-14 drop-shadow-md bg-pink-50">
      <div className="px-10">
        <h1 className="text-2xl logo-section text-red-500 txt-shadow-1">FoodHub</h1>
      </div>
      <div className="flex justify-evenly w-2/6">
        <NavLink to="/" className={({isActive}) => isActive ? "txt-shadow" : ""}>Home</NavLink>
        <NavLink to="/Recipes" className={({isActive}) => isActive ? "txt-shadow" : ""}>Recipe</NavLink>
      </div>
    </div>
  )
}

export default Navbar