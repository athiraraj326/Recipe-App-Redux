import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllRecipes, searchRecipe } from '../redux/recipeSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { allRecipes, loading, error } = useSelector(state => state.recipeReducer)
  // console.log(allRecipes, loading, error);

  const [currentPage, setCurrentPage] = useState(1)
  const recipePerPage = 8
  const totalPage = Math.ceil(allRecipes?.length / recipePerPage)
  const currentPageLastRecipeIndex = currentPage * recipePerPage
  const currentPageFirstRecipeIndex = currentPageLastRecipeIndex - recipePerPage
  const visibleRecipe = allRecipes?.slice(currentPageFirstRecipeIndex, currentPageLastRecipeIndex)

  useEffect(() => {
    dispatch(fetchAllRecipes())
  }, [])

  const navigateToNextPage = () => {
    if (currentPage != totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const navigateToPrevPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container mx-auto">
        {
          loading ?
            <div className="flex justify-center items-center my-5 text-lg">
              <img width={'100px'} className='me-2' src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif" alt="loading" /> Loading...
            </div>
            :
            <>
              <div className='flex justify-between mx-5 mb-5'>
                <h1 className='text-red-600 text-4xl'>All Recipes</h1>
                <input onChange={e => dispatch(searchRecipe(e.target.value.toLowerCase()))} type="text" placeholder='Search a Recipe by its Cuisine' className='p-2 border rounded' style={{ width: '250px' }} />
              </div>
              <div className="grid grid-cols-4 gap-4 mx-5">
                {
                  allRecipes?.length > 0 ?
                  visibleRecipe?.map(items => (
                      <div key={items?.id} className='border rounded p-2 shadow'>
                        <img width={'100%'} style={{ height: '200px' }} src={items?.image} alt="recipe" />
                        <div className='text-center my-3'>
                          <h1 className='text-xl mb-3'>{items?.name}</h1>
                          <h1 className='mb-3'>Cuisine: {items?.cuisine}</h1>
                          <Link to={`${items?.id}/view`}><button className='bg-green-600 p-2 text-white rounded'>View More</button></Link>
                        </div>
                      </div>
                    ))
                    :
                    <div className="flex justify-center items-center text-red-600 my-5 text-lg">
                      Recipes Not Found!!!
                    </div>
                }
              </div>

              <div className="text-center text-2xl font-bold mt-20">
                <span onClick={navigateToPrevPage} className='cursor-pointer'><i className="fa-solid fa-backward me-5"></i></span>
                <span> {currentPage} of {totalPage} </span>
                <span onClick={navigateToNextPage} className='cursor-pointer'><i className="fa-solid fa-forward ms-5"></i></span>
              </div>
            </>
        }
      </div>
    </>
  )
}

export default Home