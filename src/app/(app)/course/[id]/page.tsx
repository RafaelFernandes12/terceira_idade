"use client";

import { getCourse } from "@/operations/getCourse";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import StudentData from "../components/StudentsData";

interface IdProps {
    params: {
        id: string
    }
}

export default function Course({ params }: IdProps) {
  const [courseType, setCourseType] = useState("DadosGerais");
  const [course, setCourse] = useState<DocumentData | null>(null);

  useEffect(() => {
    getCourse(params.id).then(response => {
      console.log(response.local);
      setCourse(response);
    }).catch(error => {
      console.error("Error fetching course:", error);
    });
  }, []);

  function handleCourseType(filterCourse: string) {
    setCourseType(filterCourse);
  }

  return (
    <div className="border-2 border-black rounded-lg p-4 ">
      {course ? (
        <>
          <div className="border-b-2 border-black w-full font-medium my-4 text-4xl">{course.name}</div>
          <div>
            {courseType === "DadosGerais" ?
              <>
                <ul className="inline-flex gap-3 mb-4">
                  <button onClick={() => handleCourseType("DadosGerais")}>
                    <li className="font-regular text-lg border-b-2 border-[#161250]">Dados gerais</li>
                  </button>
                  <button onClick={() => handleCourseType("Participantes")}>
                    <li>Participantes</li>
                  </button>
                </ul>
                <DataTable
                  professorImg={course.professorImg}
                  professorName={course.professorName}
                  local={course.local}
                />
              </>
              :
              <>
                <ul className="inline-flex gap-3 mb-4">
                  <button onClick={() => handleCourseType("DadosGerais")}>
                    <li>Dados gerais</li>
                  </button>
                  <button onClick={() => handleCourseType("Participantes")}>
                    <li className="font-regular  text-lg border-b-2 border-[#161250]">
                      Participantes
                    </li>
                  </button>
                </ul>
                <StudentData />
              </>
            }
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
