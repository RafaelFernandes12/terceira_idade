"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { ErrorText } from "@/components/ErrorText";
import Link from "next/link";
import { editCourse } from "@/operations/editCourse";

export default function EditCourse(){

  const [newName,setNewName] = useState("");
  const [error,setError] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const playlistId = pathParts[pathParts.length - 1];

    setId(playlistId);
  }, []);

  async function changeCourse(){
    if(newName) {
      editCourse(id,newName);
    }
    else {
      setError("Todas os campos tem que estar preenchidos");            
    }
  }

  return(
    <div className='flex flex-col justify-center'>
      <h1 className='font-semibold text-2xl my-7'>Editar curso</h1>
      <div className='mb-4'>
        <TextField label='Nome:' className='w-full rounded-lg' 
          onChange={e => setNewName(e.target.value)}
        />
      </div>
      <div>
        <button className='bg-darkBlue w-24 rounded-md text-white p-2 mr-4'onClick={changeCourse}>Editar</button>
        <Link href='/dashboard'>
          <button className='border-1 border-zinc-500 w-24 rounded-md text-black p-2'>Cancelar</button>
        </Link>
      </div>
      <ErrorText error={error}/>
    </div>
  );
}