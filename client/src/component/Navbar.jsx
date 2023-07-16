import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <ul className='flex m-8 bg-gray-200 rounded-md hover:bg0gray-100'>
           <Link to={"/adduser"}> <li className='ml-4 text-pink-600 hover:text-gray-900 font-bold' >AddUser</li></Link>
           <Link to={"/addtask"}><li className='ml-4 text-pink-600 hover:text-gray-900 font-bold' >AddTask</li></Link>
           <Link to={"/tasks"}> <li className='ml-4 text-pink-600 hover:text-gray-900 font-bold' >Tasks</li></Link>
           <Link to={"/"}> <li className='ml-4 text-pink-600 hover:text-gray-900 font-bold' >Users</li></Link>
        </ul>
    </div>
  )
}

export default Navbar