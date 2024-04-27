"use client";
import { idDataProps } from "@/types/idDataProps";
import { useState } from "react";

export function ClassTime({id,data} : idDataProps) {

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
        <thead className="border-2 border-black border-collapse">
          <tr className="w-full">
            <th className="border-2 border-collapse border-black p-8 max-sm:p-2 max-sm:text-sm w-1/3">ATIVIDADE</th>
            <th className="border-2 border-collapse border-black p-8 max-sm:p-2 max-sm:text-sm w-1/3">TURMA</th>
            <th className="border-2 border-collapse border-black p-8 max-sm:p-2 max-sm:text-sm w-1/3">PROFESSOR</th>
          </tr>
        </thead>
        <tbody>
          {
            data ? 
              data.map((item: any) => {
                const matchType = item.data.type === courseType;
                if(id.includes(item.id) && matchType){

                  return( 
                    <tr key={item.id} className="text-xl uppercase w-full">
                      <td className="border-2 border-collapse border-black p-8 text-center w-1/3 max-sm:p-2">
                        <p className="break-words m-auto max-sm:text-xs ">{item.data.name}</p>
                      </td>
                      <td className="border-2 border-collapse border-black p-8 text-center text-base w-1/3 max-sm:p-2">
                        <div className="grid grid-cols-2 max-xl:grid-cols-1 max-sm:text-[10px] max-sm:leading-4 gap-1 max-sm:gap-2">
                          {item.data.local.map((value:any, index:number) => {
                            return(
                              <div key={index}>
                                <p>{value.date}</p>
                                <p>
                                  <span>{value.startHour}</span> - <span>{value.endHour}</span>
                                </p>
                                <p>{value.place}</p>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="border-2 border-collapse border-black p-8 text-center w-1/3 max-sm:p-2">
                        <p className="break-words m-auto max-sm:text-xs">{item.data.professorName}</p>
                      </td>
                    </tr>
                  );
                }
              }) : <tr><td>tem nada aqui</td></tr>
          }
        </tbody>
      </table>
    </div>
  );
}