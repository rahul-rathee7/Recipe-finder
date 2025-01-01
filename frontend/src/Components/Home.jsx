import React from 'react'
import { NavLink } from 'react-router-dom'
import Image from './Images/recipe_background.jpg'

const Home = () => {
  return (
    <div className="flex justify-around w-full h-screen -mt-14 -z-10 absolute">
      <img className="w-screen max-h-screen image-opacity absolute -z-10" src={Image} alt="recipe background" width="100%" height="10%"/>
      <div className="flex justify-center items-center w-full h-screen text-9xl backdrop-brightness-50 google-font">
        <NavLink to="/Recipes" className="txt-shadow-2">Amazing Recipes</NavLink>
      </div>  
    </div>
  )
}

export default Home