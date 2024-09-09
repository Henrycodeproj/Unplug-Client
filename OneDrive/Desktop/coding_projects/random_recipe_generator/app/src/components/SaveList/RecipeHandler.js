import {useContext, useState} from "react"
import { recipeItems } from "../../Context/context"
import { FaTrashAlt, FaArrowRight } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@mui/material"
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SaveRecipe = () =>{
    const {items, showRecipe, fetchData} = useContext(recipeItems)

    const [savedItems, setSavedItems] = useState(JSON.parse(localStorage.getItem('savedRecipes')))
    
    const saveRecipe = () => {

        let addRecipe = {
            Id:items.idMeal,
            title:items.strMeal
        }
        const array = []

        if (savedItems === null) {
            array.push(addRecipe)
            setSavedItems(array)
            localStorage.setItem('savedRecipes', JSON.stringify(array))
        }

        let idList = savedItems.map((storageItems) => storageItems.Id)

        if (idList.includes(addRecipe.Id) === true) {
            alert('This recipe is already in your list!')
            return
        } else {
            const newList = [...savedItems, addRecipe]
            setSavedItems(newList)
            localStorage.setItem('savedRecipes', JSON.stringify(newList))
        }
    }

    const deleteHandler = (id) =>{
        let currentSavedList = JSON.parse(localStorage.getItem('savedRecipes'))
        let changedList = currentSavedList.filter((items) => items.Id !== id)
        setSavedItems(changedList)
        localStorage.setItem('savedRecipes', JSON.stringify(changedList))
    }

    const listAnimations = {
        Begin:{
            y:50,
            opacity:[0,.5,1]
        },
        Motion:{
            y:0,
            opacity:[0,.5,1],
            transition:{
                duration:.75,
            },
        },
        Leave:{
            y:25,
            opacity:[1,.5,0],
            transition:{
                duration:.75
            }
        }
    }

    return (
        <section>
            <div className="list_container">
                <div className="savelist_buttons">
                <Button variant = "contained"className="next_arrow" onClick={()=>fetchData()}>
                    Next <FaArrowRight className='faArrow'/>
                </Button>
                <Button variant = "contained" color="info" className="save_button" onClick={() => saveRecipe()}>
                    Save Recipe
                    <MenuBookIcon className="MenuBookIcon"/>
                </Button>
                </div>
                    <ul className="saved_container">
                    <AnimatePresence>
                    {savedItems ? savedItems.map((listItems) =>
                        <motion.div
                            key={listItems.title}
                            variants = {listAnimations}
                            initial = "Begin"
                            animate = "Motion"
                            exit = "Leave"
                        >
                            <li className="list_display" key={listItems.Id}>
                                <a className = "list_links"onClick={() => showRecipe(listItems.Id)}>{listItems.title}</a>
                                <div
                                className="trash_delete" onClick={()=> deleteHandler(listItems.Id)}><FaTrashAlt className="trash_icon"/></div>
                            </li>
                        </motion.div>
                    ):
                         <div>You currently have no saved recipes</div>
                    }
                    </AnimatePresence>
                    </ul>
                </div>
            </section>
    )
}

export default SaveRecipe

// testing branches again