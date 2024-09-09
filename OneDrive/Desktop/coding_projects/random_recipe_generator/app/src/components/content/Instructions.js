import Ingredients from './Ingredients';
import { motion } from 'framer-motion';
import {recipeItems} from '../../Context/context';
import { useContext} from 'react';
import { Button, Modal, Box, Typography} from '@mui/material';
import {useState} from 'react';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export const Instructions = () => {

    const [isClicked, setisClicked] = useState(false)
    const [categories, setCategories] = useState([])

    const {items, showRecipe} = useContext(recipeItems)

    const getCategories = async (category) => {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
        const response = await fetch(`${url}${category}`)
        const recipeObject = await response.json()
        const recipes = recipeObject.meals
        setCategories(recipes)
    }
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: '300px',
        width: '300px',
        overflow: 'auto',
        borderRadius:'10px'
    };

    const ingredients = []
    //gets the values from the keys in returned json object
    let values = Object.values(items)
    let counter = 29
    //The item number position starts at 9 and the ingredients start at 29 for api,
    for (let i = 9; i <= 28; i++) { 
        let arr = []
        arr.push(values[counter])
        arr.push(values[i])
        counter += 1
        if (arr[0] && arr[1] !== '') {
            ingredients.push(arr)
        }
    }
    const handlePopOpen = () =>{
        getCategories(items.strCategory)
        setisClicked(true)
    }
    const handlePopClose = () => {
        setisClicked(false)
    }

    const instructions = items.strInstructions

    return (
        <aside>
            <div className='title_container'>
                <h1 className='instructions_title'>Instructions</h1>
                <LocalDiningIcon/>
            </div>
            {items.strInstructions && instructions.map((steps, index) => (steps.length !== 1 && steps.length !== 0) || steps !== '' ? <div  className='steps'> {index + 1}: {steps}</div>:null)}
            <div className='video_link'>
                <a href = {items.strYoutube} target = "blank" title='Click here to watch a video tutorial'>Watch a video</a>
            </div>
            {<Button variant="outlined" className='category_tag' title='Click here for more recipes in this category' onClick={()=> handlePopOpen(items.strCategory)}>
                {items.strCategory}
            </Button>}
            <motion.div className='test'>
                <ul className='ingredients_list'>
                    {ingredients.map((measurements, index) =>
                        <Ingredients
                            index = {index}
                            measurements = {measurements}
                        />
                    )}
                </ul>
            </motion.div>
            <Modal open = {isClicked} onClose={handlePopClose}>
                <Box className = "Box"sx ={style}>
                    <Typography>
                    <h1 className='category_title'>Categories</h1>
                        <ul>
                            {categories && categories.map((category) =>
                            <li className='category_recipes' onClick={() => showRecipe(category.idMeal)}>
                                <img className='preview' src = {category.strMealThumb}></img>
                                <div>{category.strMeal}</div>
                            </li>
                            )}
                        </ul>
                    </Typography>
                </Box>
            </Modal>
        </aside>
    )
}
