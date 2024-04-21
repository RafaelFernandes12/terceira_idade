"use client";
import { SearchBar } from "@/components/SearchBar";
import { ThreeDots } from "@/components/ThreeDots";
import { deleteStudent } from "@/operations/deleteStudent";
import { getStudents } from "@/operations/getStudents";
import { Person } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

interface studentProps {
  id: string,
  data: DocumentData
}

export default function Students() {

  const [search, setSearch] = useState("");
  const [students,setStudents] = useState<studentProps[]>([]);

  function handleInputChange(value:any){ setSearch(value);}

  useEffect(() => {
    getStudents().then(response => {
      setStudents(response);
    });
  },[students]);

  return (
    <>
      <SearchBar onChange={handleInputChange}/>
      <div className="flex justify-end">
        <Link href='createStudent' 
          className="bg-darkBlue text-white rounded-lg p-1 px-4 flex justify-between items-center w-fit max-sm:p-0.5"
        >
          <p className="max-sm:hidden">Criar estudante</p>
          <AddIcon />
        </Link>
      </div>
      {students.map((response) => {

        if(response && response.data.name.toLowerCase().startsWith(search.toLowerCase())){
          return (
            <div key={response.id} className="flex items-center justify-between border-1 border-gray-500 rounded-3xl p-4 my-6 ">
              <Link
                href={`/student/${response.id}`} 
                className="w-11/12">
                <ErrorIcon className={`text-red-500 ${response.data.cardiologista === "" || 
                response.data.residencia === "" || response.data.dermatologista === "" ||
                response.data.rg_frente === "" || response.data.rg_verso === "" ? "" : "hidden"}`} />
                <div className="flex gap-4 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={response.data.foto} alt='' className={`w-32 h-32 rounded-full bg-contain max-sm:w-20 max-sm:h-20 
                    ${response.data.foto.includes("generic") ? "hidden" : "" }`}/>
                  <Person className={`w-32 h-32 rounded-full bg-contain max-sm:w-20 max-sm:h-20 
                    ${response.data.foto.includes("generic") ? "" : "hidden" }`}/>
                  <div className="flex gap-2 flex-col ml-4 max-sm:text-xs">
                    <span>{response.data.name}</span>
                    <span>{response.data.cpf}</span>
                  </div>
                </div>
              </Link>
              <ThreeDots id={response.id} edit="editDocs" remove={deleteStudent}/>
            </div>
          );
        }
      })}
    </>
  );
}
