import React, { useState, useEffect } from "react";
import OpenRecipe from './OpenRecipe';
import { NavLink } from 'react-router-dom'

const Recipe = () => {
  const [recipe_finder, setRecipeFinder] = useState("");
  const [api_data, setApiData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(recipe_finder);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // To store selected recipe

  // Debounce effect: updates `debouncedSearch` 400ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(recipe_finder), 400);
    return () => clearTimeout(handler);
  }, [recipe_finder]);

  useEffect(() => {
    const fetchData = async () => {
      // if (!debouncedSearch) {
      //   setApiData([]);
      //   return;
      // }
      try {
        const data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearch}`
        );
        const response = await data.json();
        setApiData(response.meals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setApiData([]);
      }
    };
    fetchData();
  }, [debouncedSearch]);

  const openRecipeFunc = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe
  };

  return (
    <div className="w-full border-2 border-red-500 text-center p-4">
      <h1 className="text-5xl google-font flex justify-center items-center h-40 flex-wrap">
        Search Recipes with &nbsp;
        <span className="text-red-500 txt-shadow-1">FoodHub</span>
      </h1>
      <p className="font-serif">Type Recipes in the search bar</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2 justify-center">
          <input
            type="text"
            className="border-2 bg-pink-50 w-1/2 p-2 my-8 rounded-md"
            onChange={(e) => setRecipeFinder(e.target.value.toLowerCase())}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50px"
            viewBox="0 -960 960 960"
            width="50px"
            fill="#000"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
      </form>
      <h1 className="font-serif text-3xl m-3">Recipe List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-fit">
        {api_data.length > 0 ? (
          api_data.map((item, index) => (
            <NavLink to={`/RecipeDesc/${item.idMeal}`}>
              <div
              onClick={() => openRecipeFunc(item)} // Pass the selected recipe on click
              key={item.idMeal}
              className="flex flex-col items-center p-4 border rounded-lg shadow-md cursor-pointer"
            >
              <img 
                src={item.strMealThumb} 
                alt={item.strMeal} 
                className="w-64 h-64 object-cover rounded-md"
              />
              <p className="mt-2 font-semibold text-lg">{item.strMeal}</p>
            </div>
            </NavLink>
          ))
        ) : (
          <p className="col-span-3 text-gray-500">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default Recipe;