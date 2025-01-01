import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Home from './Components/Home.jsx'
import Recipe from './Components/Recipe.jsx'
import NotFound from './Components/NotFound.jsx'
import OpenRecipe from './Components/OpenRecipe'

function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:
        <div>
          <Navbar />
          <Home />
        </div>
      },
      {
        path:'/Recipes',
        element:
        <div>
          <Navbar />
          <Recipe />
        </div>,
      },
      {
        path:'/RecipeDesc/:id',
        element:
        <div>
          <Navbar />
          <OpenRecipe />
        </div>,
      },
      {
        path:'*',
        element: <NotFound />
      }
    ]
  )

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
