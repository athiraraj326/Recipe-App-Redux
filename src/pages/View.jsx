import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAllRecipes } from '../redux/recipeSlice';

const View = () => {

  const {id} = useParams()
  console.log(id);
  const [recipe,setRecipe] = useState({})

  useEffect(()=>{
    if(sessionStorage.getItem("allRecipes")){
      const allRecipes = JSON.parse(sessionStorage.getItem("allRecipes"))
      setRecipe(allRecipes?.find(item=>item.id==id))
    }
  },[])

  console.log(recipe);
  

  return (
    <>
      <div style={{ paddingTop: '150px' }} className='container mx-10'>
        <div className="grid grid-cols-2">
          <img width={'70%'} src={recipe?.image} alt="" />
          <div>
            <h3>ID: {recipe?.id}</h3>
            <h1 className='text-4xl font-bold my-5'>{recipe?.name}</h1>
            <h2 className='mb-3'><span className='font-bold'>Ingredients:</span> {recipe?.ingredients}</h2>
            <p className='mb-5'><span className='font-bold'>Instructions:</span> {recipe?.instructions}</p>
            <p className='mb-1'>Cuisine: {recipe?.cuisine}</p>
            <p className='mb-1'>Meal Type: {recipe?.mealType}</p>
            <p className='mb-1'>Preparation Time: {recipe?.prepTimeMinutes}min</p>
            <p className='mb-1'>Cooking Time: {recipe?.cookTimeMinutes}min</p>
            <p>Servings: {recipe?.servings}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default View