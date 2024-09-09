import { useContext } from "react";
import { recipeItems } from "../../Context/context";

const Content = () =>{
    const {items} = useContext(recipeItems)

    return (
        <div>
            <h1 className='meal_name'>{items.strMeal}</h1>
            <h3 className='region'>Region: {items.strArea}</h3>
        </div>
    )
}

export default Content