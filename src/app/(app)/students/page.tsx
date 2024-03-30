"use client";
import { SearchBar } from "@/components/SearchBar";
import { data } from "@/data";
import Image from "next/image";
import { useState } from "react";

export default function Students() {
  const [search, setSearch] = useState("");
    
  function handleInputChange(value:any){ setSearch(value);}


  return (
    <>
      <SearchBar onChange={handleInputChange}/>
      {data.map(response => {

        if(response && response.name.toLowerCase().startsWith(search.toLowerCase())){
          return (
            <div key={response.cpf} className="border-1 border-gray-500 rounded-3xl flex responses-center p-4 my-6">
              <Image src={response.img} alt='' className="w-32 h-auto"/>
              <div className="flex gap-2 flex-col ml-4">
                <span>{response.name}</span>
                <span>{response.cpf}</span>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
