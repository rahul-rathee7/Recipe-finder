import React, { useState, useEffect } from 'react';
import './Recipe.css';
import { useParams } from 'react-router-dom';

const OpenRecipe = () => {
  const { id } = useParams();
  const [ApiData, setApiData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const response = await data.json();
        setApiData(response.meals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setApiData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); 
  

  return (
    <div className="p-4 border rounded-lg shadow-md mt-4">
      {loading ? (
        <div className="flex justify-center h-screen items-center">
          <p className="loader"></p>
        </div>
      ) : ApiData?.length > 0 ? (
        ApiData.map((meal) => (
          <div key={meal.idMeal} className="p-4 border rounded-lg mb-4">
            <h2 className="text-xl font-bold">{meal.strMeal}</h2>
            <div className="grid grid-cols-2 gap-10 my-4">
              <div>
              <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-96 object-cover rounded-lg"
            />
            </div>
            <div className="flex-col text-justify">
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>
            <p className="mt-4"><strong>Instructions:</strong> {meal.strInstructions}</p>
            </div>
            </div>
          </div>
        ))
      ) : (
        <p>No recipes found for the given ID.</p>
      )}
    </div>
  );
};

export default OpenRecipe;