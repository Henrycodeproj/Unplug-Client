import { useState, useEffect, createContext } from "react";

export const recipeItems = createContext()

export const RecipeContext = ({children}) => {

    const [items, setItems] = useState([])

    //fetch data on inital startup
    const fetchData = async () => {
      const url = 'https://www.themealdb.com/api/json/v2/1/random.php'
      const response = await fetch(`${url}`)
      const recipeObject = await response.json()
      const recipe = recipeObject.meals[0]
      recipe.strInstructions = recipe.strInstructions.split(".");
      setItems(recipe);
    }

    useEffect(()=> {
      (async () => await fetchData())()
    },[])

    //sends id to api link and then resends then sets item variable to the specific list item to display older recipe

    const showRecipe = async (id) =>{
      const url = `https://www.themealdb.com/api/json/v2/1/lookup.php?i=${id}`
        const response = await fetch(`${url}`)
        const previousRecipe = await response.json()
        const displayRecipe = await previousRecipe.meals[0]
        displayRecipe.strInstructions = displayRecipe.strInstructions.split(".");
        setItems(displayRecipe);
    }

    //creates template for children, and values are sent through usecontext
    return (
        <recipeItems.Provider value = {{items, setItems, showRecipe, fetchData}}>
          {children}
        </recipeItems.Provider>
    )
}
