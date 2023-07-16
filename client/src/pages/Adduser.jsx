import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_USER } from "../Mutations/Mutation";
import { useNavigate } from "react-router-dom";
import { Get_Users } from "../Queries/query";
const Adduser = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adduser]=useMutation(ADD_USER,{
    variables:{name,email,password},
    refetchQueries:[{query:Get_Users}],
  })
  const navigate=useNavigate();


  const onSubmit=(e)=>{
    e.preventDefault();
    if(name==="" || email ==="" || password===""){
        return alert("pls filled all field");
    }
    adduser(name,email,password);
    navigate("/");
  }


  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col w-[320px] mt-[50px] rounded-3xl h-[230px] bg-gray-200 items-center justify-center" onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e)=>setname(e.target.value)}
          placeholder="enter name"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 "
        />
        <input
          type="email"
          onChange={(e)=>setemail(e.target.value)}

          placeholder="enter email"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 m-3"
        />
        <input
          type="password"
          onChange={(e)=>setpassword(e.target.value)}
          placeholder="enter password"
          className="w-[300px] border-b-[1.5px] p-[2px] font-semibold indent-2 border-solid border-gray-400 "
        />
        <button
          type="submit"
          className="w-[300px] bg-slate-900 text-white rounded-md mt-3 font-bold text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Adduser;
