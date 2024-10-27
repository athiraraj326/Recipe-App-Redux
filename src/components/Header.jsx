import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav className='bg-green-600 fixed w-full p-5 text-white'>
        <Link to={'/'}><i class="fa-solid fa-pizza-slice me-1 text-2xl"></i> <span className='text-2xl'>Recipes</span></Link>
      </nav>
    </>
  )
}

export default Header