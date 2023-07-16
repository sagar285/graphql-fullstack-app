import React, { useState } from "react";
import { ADD_TASK } from "../Mutations/Mutation";
import { ALL_TASK, Get_Users } from "../Queries/query";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const Addtask = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [user, setuser] = useState("");
  const { data, loading, error } = useQuery(Get_Users);
  const [addtask] = useMutation(ADD_TASK, {
    variables: { title, description, user },
    refetchQueries:[{query:ALL_TASK}]
  });

  const navigate=useNavigate();

  const onSubmit=(e)=>{
     e.preventDefault();
     if(title==="" || description==="" ||user ===""){
        return alert("pls fill allfield");
     }
     addtask(title,description,user)
     settitle("")
     setdescription("")
     setuser("")
     navigate("/tasks");
  }

  return (
    <div className="flex flex-col items-center">
      {!loading && !error && (
        <form
          className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            onChange={(e) => settitle(e.target.value)}
            placeholder="enter title"
            className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 "
          />
          <input
            type="text"
            onChange={(e) => setdescription(e.target.value)}
            placeholder="enter description"
            className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
          />
          <select
            className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 "
            value={user}
            onChange={(e) => setuser(e.target.value)}
          >
            <option>Select option</option>
            {data.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
          type="submit"
          className="w-[300px] bg-slate-900 text-white rounded-md mt-3 font-bold text-lg"
        >
          Submit
        </button>
        </form>
      )}
    </div>
  );
};

export default Addtask;
