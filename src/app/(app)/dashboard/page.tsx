'use client'

import { SearchBar } from "@/components/SearchBar";
import { getCourses } from "@/operations/getCourses";
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";
import { ThreeDots } from "./components/ThreeDots";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

interface coursesProps {
  id: string,
  data: DocumentData
}

export default function Home() {

  const [courses,setCourses] = useState<coursesProps[]>([])
  const [courseType,setCourseType] = useState('Extensão')

  useEffect(() => {
    getCourses().then(response => {
      setCourses(response)
    })
  })
  function handleCourseType(filterCourse: string){
    if(filterCourse === 'Extensão') setCourseType('Extensão')
    if(filterCourse === 'Ensino') setCourseType('Ensino')
  }

  return (
    <div>
      <SearchBar />
      <div className="border-2 border-black rounded-lg p-4">
      <div className="flex justify-between mx-6 mb-10 mt-4">
          {courseType === 'Extensão' ?         
            <ul className="inline-flex gap-3">
                <button onClick={() => handleCourseType('Extensão')}>
                    <li className="font-regular text-lg border-b-2 border-[#161250]">Extensão</li>
                </button>
                <button onClick={() => handleCourseType('Ensino')}>
                    <li>Ensino</li>
                </button>
            </ul> 
          :
           <ul className="inline-flex gap-3">
              <button onClick={() => handleCourseType('Extensão')}>
                  <li >Extensão</li>
              </button>
              <button onClick={() => handleCourseType('Ensino')}>
                  <li className="font-regular  text-lg border-b-2 border-[#161250]">Ensino</li>
              </button>
          </ul> 
          }

          <Link href='createCourse' className="bg-darkBlue text-white rounded-lg p-1 px-6 flex space-between items-center"
          >Criar curso
            <AddIcon />
          </Link>
      </div>

      <div className="grid grid-cols-4 m-0">
      {courses.map((response => {
        const matchType = response.data.type === courseType
        if(matchType){
          return(
            <div key={response.id} className="w-48 flex items-center flex-col m-auto">
              <img src={response.data.imgUrl} alt='' className="bg-violet p-4 rounded-lg w-full h-full m-auto"/>
              <span className="w-full truncate">{response.data.name}</span>
                <ThreeDots id={response.id}/>
            </div>
          )
        }
      }))}
      </div>
      </div>
    </div>
  );
}