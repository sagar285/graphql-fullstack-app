import { useMutation, useQuery } from '@apollo/client';
import React,{useState,useEffect} from 'react'
import { EDIT_TASK } from '../Mutations/Mutation';
import { useNavigate, useParams } from 'react-router-dom';
import { ALL_TASK, SINGLE_TASK } from '../Queries/query';

const Edittask = () => {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [user, setuser] = useState("");
    const {id}=useParams();

    const {data,loading,error} =useQuery(SINGLE_TASK,{
     variables:{id}
    })
    const [edittask]=useMutation(EDIT_TASK,{
        variables:{id,title,description},
        refetchQueries:[{query:ALL_TASK}]
    })



    const navigate=useNavigate();

const setdetail =()=>{
    if(data){
        settitle(data.task.title)
        setdescription(data.task.description)
        setuser(data.task.user.name)
    }
}

const onSubmit=(e)=>{
   e.preventDefault();
   edittask(title,description)
   navigate("/tasks");
}

useEffect(()=>{
   setdetail();
},[data])







  return (
    <div className="flex flex-col items-center">
    {!loading && !error && (
      <form
        className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="enter title"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 "
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="enter description"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
        <input
          type="text"
          value={user}
            disabled
          placeholder="enter description"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
       
        <button
        type="submit"
        className="w-[300px] bg-slate-900 text-white rounded-md mt-3 font-bold text-lg"
      >
        Submit
      </button>
      </form>
    )}
  </div>
  )
}

export default Edittask