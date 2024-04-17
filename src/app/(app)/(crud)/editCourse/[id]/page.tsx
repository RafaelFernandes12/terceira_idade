"use client";

import { ErrorText } from "@/components/ErrorText";
import { editCourse } from "@/operations/editCourse";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const types = ["Extensão", "Ensino"];


export default function EditCourse() {

  const [name, setName] = useState("");
  const [courseImg, setCourseImg] = useState<any>();
  const [professorName, setProfessorName] = useState("");
  const [professorImg, setProfessorImg] = useState<any>();
  const [error, setError] = useState("");
  const [type, setType] = useState("Extensão");
  const [id, setId] = useState("");
  const [local, setLocal] = useState<Array<any>>([]);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const courseId = pathParts[pathParts.length - 1];
    
    setId(courseId);
  }, []);

  async function addCourse(e: any) {
    e.preventDefault();
    if (name) {
      editCourse({ id, name, courseImg, type, professorName, professorImg, local });
      console.log("oi");
    } else {
      setError("Todos os campos devem estar preenchidos");
    }
  }

  function handleInputName(value: string) { setName(value); }
  function handleInputProfessorName(value: string) { setProfessorName(value); }
  function handleInputType(value: string) { setType(value);}
  
  function handleInputChange(index: number, propertyName: string, value: any) {
    setLocal(prevLocal => {
      const updatedLocal = [...prevLocal];
      updatedLocal[index] = {
        ...updatedLocal[index],
        [propertyName]: value
      };
      return updatedLocal;
    });
  }
  function handleCreateNewLocal() {
    setLocal(prevLocal => [
      ...prevLocal,
      { date: "", startHour: "", endHour:"", place: "" }
    ]);
  }

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='font-semibold text-2xl my-7'>Editar curso</h1>
      <div className='mb-4'>
        <InputField 
          label='Nome:' 
          value={name} 
          onChange={handleInputName} 
        />
        <label>Foto do curso: </label>
        <input
          placeholder=''
          type='file' 
          onChange={e => setCourseImg(e.currentTarget.files![0])} 
        />
        <SelectField 
          inputLabel='Tipo' 
          value={type} 
          label='Extensão' 
          onChange={handleInputType} 
          itens={types} 
        />
        <InputField 
          label='Nome do Professor:' 
          value={professorName}
          onChange={handleInputProfessorName} 
        />
        <label>Foto do professor do curso: </label>
        <input 
          type='file' 
          onChange={e => setProfessorImg(e.currentTarget.files![0])} 
        />
        <div className="flex gap-4 items-center my-4">
          {local.map((item, index) => (
            <div key={index}>
              <SelectField
                inputLabel='Dia'
                value={item.date}
                label='Dia'
                onChange={(e: any) => handleInputChange(index, "date", e)}
                itens={daysOfWeek}
              />
              <div className="flex flex-col">
                <label>Hora de começo curso:</label>
                <TextField
                  type="time" 
                  value={item.startHour} 
                  onChange={(e: any) => handleInputChange(index, "startHour", e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Hora de fim curso:</label>
                <TextField 
                  type="time" 
                  value={item.endHour} 
                  onChange={(e: any) => handleInputChange(index, "endHour", e.target.value)}
                />
              </div>
              <InputField
                label='Lugar do curso:'
                value={item.place}
                onChange={(e: string) => handleInputChange(index, "place", e)}
              />
            </div>
          ))}
          <button
            className="bg-black rounded-md p-2 text-white" 
            onClick={handleCreateNewLocal}>
            Add Local
          </button>
        </div>
      </div>
      <div>
        <button className='bg-darkBlue w-24 rounded-md text-white p-2 mr-4' onClick={addCourse}>Criar</button>
        <Link href='/dashboard'>
          <button className='border-1 border-zinc-500 w-24 rounded-md text-black p-2'>Cancelar</button>
        </Link>
      </div>
      <ErrorText error={error} />
    </div>
  );
}

