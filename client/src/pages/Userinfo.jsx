import React, { useState } from 'react'
import { DELETE_USER } from '../Mutations/Mutation'
import { useMutation } from '@apollo/client'
import {useNavigate} from "react-router-dom"
import { ALL_TASK, Get_Users } from '../Queries/query'


const Userinfo = ({user}) => {
    const [optionvalue,setoptionvalue]=useState(["Delete","View","Edit"])
    const [deleteuser]=useMutation(DELETE_USER,{
        variables:{id:user.id},
        refetchQueries:[{query:Get_Users},{query:ALL_TASK}]
    })
    const navigate =useNavigate();


    const handlechange =(e)=>{
        if(e.target.value==="Delete"){
              deleteuser();
        }
        else if(e.target.value==="Edit"){
             navigate(`/edituser/${user.id}`)
        }
        else if(e.target.value==="View"){
             navigate(`/viewuser/${user.id}`)
        }
        else{
            alert("you click on wrong one");
        }
        

    }





  return (
    <div>
        <hr className='bg-black h-1'/>
        <div>
            <ul className='flex'>
                <li className='ml-4 mt-1 p-2'>{user.name}</li>
                <li className='ml-4 mt-1 p-2'>{user.email}</li>
                <li className='ml-4 mt-1 p-2'>
                  <select className='bg-gray-700 rounded-md p-1 text-white font-semibold m-1'
                  onChange={(value)=>handlechange(value)}
                  >
                    <option>Select option</option>
                    {
                        optionvalue.map((v,i)=>(
                            <option key={i} value={v}>{v}</option>
                        ))
                    }
                  </select>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Userinfo
