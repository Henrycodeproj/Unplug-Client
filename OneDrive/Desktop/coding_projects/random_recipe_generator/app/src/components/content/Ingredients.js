import { motion } from "framer-motion"

const Ingredients = ({measurements,index}) => {
    return (
            <li className="ingredients_container" key={index}>
                <motion.img draggable = {false} className = "ingredient_image" src= {'https://www.themealdb.com/images/ingredients/' +  measurements[1] + '-Small.png'}>
                </motion.img>
                <div className="ingredient_name">
                    <span className="measurements">{measurements[0]}</span><span className="measurements">{measurements[1]}</span>
                </div>
            </li>
    )
}

export default Ingredients