"use client";
import { data } from "@/data";
import { studentProps } from "@/types/studentProps";
import { useState } from "react";

export function ClassTime({name} : studentProps) {

  const [courseType,setCourseType] = useState("Extensão");

  function handleCourseType(filterCourse: string){
    if(filterCourse === "Extensão") setCourseType("Extensão");
    if(filterCourse === "Ensino") setCourseType("Ensino");
  }

  return (
    <div>
      <ul className="flex gap-3 mx-6 mb-10 mt-4">
        <button onClick={() => handleCourseType("Extensão")}>
          <li className={`font-regular text-lg max-md:text-sm ${courseType === "Extensão" ? "border-b-[3px] border-darkBlue" : ""}`}>Extensão</li>
        </button>
        <button onClick={() => handleCourseType("Ensino")}>
          <li className={`font-regular text-lg max-md:text-sm ${courseType === "Ensino" ? "border-b-[3px] border-darkBlue" : ""}`}>Ensino</li>
        </button>
      </ul>
      <table className="mb-10 m-auto w-11/12">
        <thead className="border-2 border-black border-separate">
          <tr className="w-full">
            <th className="border-2 border-separate border-black p-6 w-1/3">ATIVIDADE</th>
            <th className="border-2 border-separate border-black p-6 w-1/3">TURMA</th>
            <th className="border-2 border-separate border-black p-6 w-1/3">PROFESSOR</th>
          </tr>
        </thead>
        <tbody>
          {
            courseType === "Extensão" ?
              data.map((item, index) => {
                return(
                  <tr key={index}>
                    <td className="border-2 border-separate border-black p-8 text-center">
                      {item.name}
                    </td>
                    <td className="border-2 border-separate border-black p-8 text-center">
                      <div className="flex flex-col">
                        <p>{item.cpf}</p>
                        <p>{item.cpf}</p>
                        <p>{item.cpf}</p>
                      </div>
                    </td>
                    <td className="border-2 border-separate border-black p-8 text-center">
                      {item.cpf}
                    </td>
                  </tr>
                );
              })
              :
              <h1>tem nada</h1>
          }
        </tbody>
      </table>
    </div>
  );
}