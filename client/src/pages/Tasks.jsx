import React from 'react'
import { ALL_TASK } from '../Queries/query'
import { useQuery } from '@apollo/client'
import Taskinfo from './Taskinfo'


const Tasks = () => {
    const {data,loading,error}=useQuery(ALL_TASK)
  return (
    <div>
         <div className=' m-20'>
            <ul className='flex text-black font-bold text-lg'>
                <li className='ml-4'>Title</li>
                <li className='ml-20'>Decription</li>
                <li className='ml-20'>User</li>
                <li className='ml-20'>Action</li>
            </ul>
        {
            !loading && !error && data.tasks.map((task)=>(
                <Taskinfo key={task.id} task={task}/>
            ))
        }
        </div>
    </div>
  )
}

export default Tasks