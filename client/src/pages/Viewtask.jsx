import { useQuery } from '@apollo/client'
import React from 'react'
import { SINGLE_TASK } from '../Queries/query'
import { useParams } from 'react-router-dom'


const Viewtask = () => {
    const {id}=useParams();
    const {data,loading,error}=useQuery(SINGLE_TASK,{
        variables:{id},
    })
  return (
    <div className='flex flex-col items-center'>
    {!loading && !error && (
        <div className='flex flex-col items-center justify-center h-[300px] bg-gray-200 w-[250px] rounded-[2.5rem]'>
           <h1><span className='font-semibold text-gray-900 m-1'>Title:</span>{data.task.title}</h1>
           <h1><span className='font-semibold text-gray-900 m-1'>Description:</span>{data.task.description}</h1>
           <h1><span className='font-semibold text-gray-900 m-1'>User:</span>{data.task.user.name}</h1>
        </div>
    )}
</div>
  )
}

export default Viewtask