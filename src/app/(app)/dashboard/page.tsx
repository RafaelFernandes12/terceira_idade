"use client";

import { getCourses } from "@/operations/getCourses";
import AddIcon from "@mui/icons-material/Add";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBar } from "../../../components/SearchBar";
import { ThreeDots } from "./components/ThreeDots";

interface coursesProps {
  id: string,
  data: DocumentData
}

export default function Dashboard() {

  const [courses,setCourses] = useState<coursesProps[]>([]);
  const [courseType,setCourseType] = useState("Extensão");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCourses().then(response => {
      setCourses(response);
    });
  },[]);

  function handleCourseType(filterCourse: string){
    if(filterCourse === "Extensão") setCourseType("Extensão");
    if(filterCourse === "Ensino") setCourseType("Ensino");
  }
  function handleInputChange(value:any){ setSearch(value);}
  
  return (
    <div>
      <SearchBar onChange={handleInputChange} />
      <div className="border-2 border-black rounded-lg p-4">
        <div className="flex justify-between mx-6 mb-10 mt-4">
          {courseType === "Extensão" ?         
            <ul className="inline-flex gap-3">
              <button onClick={() => handleCourseType("Extensão")}>
                <li className="font-regular text-lg border-b-2 border-[#161250] max-md:text-sm">Extensão</li>
              </button>
              <button onClick={() => handleCourseType("Ensino")}>
                <li className="max-md:text-sm">Ensino</li>
              </button>
            </ul> 
            :
            <ul className="inline-flex gap-3">
              <button onClick={() => handleCourseType("Extensão")}>
                <li className="max-md:text-sm">Extensão</li>
              </button>
              <button onClick={() => handleCourseType("Ensino")}>
                <li className="font-regular  text-lg border-b-2 border-[#161250] max-md:text-sm">Ensino</li>
              </button>
            </ul> 
          }

          <Link href='createCourse' 
            className="bg-darkBlue text-white rounded-lg p-1 px-6 flex space-between items-center max-sm:p-0.5"
          ><p className="max-sm:hidden">Criar curso</p>
            <AddIcon />
          </Link>
        </div>

        <div className="grid 2xl:grid-cols-4 m-0 lg:grid-cols-3 md:grid-cols-2">
          {courses.map((response => {
            const matchType = response.data.type === courseType;

            if(matchType && response.data.name.toLowerCase().startsWith(search.toLowerCase())){
              return(
                <div key={response.id} className="w-52 h-52 flex items-center flex-col m-auto mb-14">
                  <Link href={`course/${response.id}`} className="bg-violet p-4 rounded-lg m-auto w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={response.data.imgUrl} alt='' className="object-cover w-full h-full"/>
                  </Link>
                  <div className="flex  items-center justify-between w-full">
                    <span className="w-full truncate">{response.data.name}</span>
                    <ThreeDots id={response.id}/>
                  </div>
                </div>
              );
            }
          }))}
        </div>
      </div>
    </div>
  );
}