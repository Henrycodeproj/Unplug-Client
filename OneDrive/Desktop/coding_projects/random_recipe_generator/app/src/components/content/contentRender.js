import { useContext, useEffect, useState} from 'react';
import {recipeItems} from '../../Context/context';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

export const ContentRender = () => {
    
    const {items} = useContext(recipeItems)

    useEffect(()=>{
        console.log('items changing')
    },[items])

    return (
        <article>
            <div className='display_wrapper'>
                <div className='random_recipe'>
                    <img className = "food_image" src = {items.strMealThumb} alt = "text"></img>
                </div>
            </div>
        </article>
    )
}

export default ContentRender