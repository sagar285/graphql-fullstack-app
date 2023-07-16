import { useQuery } from '@apollo/client'
import React from 'react'
import { Get_Users } from '../Queries/query'
import Userinfo from './Userinfo'




const Users = () => {
    const {data,loading,error} =useQuery(Get_Users)
    console.log(data);
  return (
    <div>
        <div className=' m-20'>
            <ul className='flex text-black font-bold text-lg'>
                <li className='ml-4'>Name</li>
                <li className='ml-20'>Email</li>
                <li className='ml-20'>Action</li>
            </ul>
        {
            !loading && !error && data.users.map((user)=>(
                <Userinfo key={user.id} user={user}/>
            ))
        }
        </div>
    </div>
  )
}

export default Users