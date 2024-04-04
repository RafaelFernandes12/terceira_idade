"use client";
import { SearchBar } from "@/components/SearchBar";
import { getStudents } from "@/operations/getStudents";
import ErrorIcon from "@mui/icons-material/Error";
import { DocumentData } from "firebase/firestore";
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
  },[]);

  return (
    <>
      <SearchBar onChange={handleInputChange}/>
      {students.map(response => {

        if(response && response.data.name.toLowerCase().startsWith(search.toLowerCase())){
          if(response.data.cardiologista === "" || response.data.residencia === "" || response.data.dermatologista === "" ||
          response.data.rg_frente === "" || response.data.rg_verso === ""){
            return (
              <div key={response.data.cpf} className="border-1 border-gray-500 rounded-3xl flex responses-center p-4 my-6 justify-between">
                <div className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={response.data.foto} alt='' className="w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20"/>
                  <div className="flex gap-2 flex-col ml-4 max-sm:text-xs">
                    <span>{response.data.name}</span>
                    <span>{response.data.cpf}</span>
                  </div>
                </div>
                <ErrorIcon className="text-red-800 " />
              </div>
            );
          }
          else {
            return (
              <div key={response.data.cpf} className="border-1 border-gray-500 rounded-3xl flex responses-center p-4 my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={response.data.foto} alt='' className="w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20"/>
                <div className="flex gap-2 flex-col ml-4 max-sm:text-xs">
                  <span>{response.data.name}</span>
                  <span>{response.data.cpf}</span>
                </div>
              </div>
            );
          }
        }
      })}
    </>
  );
}
