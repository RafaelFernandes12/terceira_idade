'use client'
import { getCourse } from '@/operations/getCourse'
import { getStudents } from '@/operations/getStudents'
import { idDataProps } from '@/types/idDataProps'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import StudentData from '../components/StudentsData'

interface IdProps {
  params: {
    id: string
  }
}

export default function Course({ params }: IdProps) {
  const [course, setCourse] = useState<DocumentData>([])
  const [students, setStudents] = useState<idDataProps[]>([])

  useEffect(() => {
    getCourse(params.id).then((item) => {
      setCourse(item)
    })
    getStudents().then((item) => {
      setStudents(item)
    })
  }, [])

  const [courseType, setCourseType] = useState('DadosGerais')

  function handleCourseType(filterCourse: string) {
    setCourseType(filterCourse)
  }
  return (
    <div className="border-2 border-black rounded-lg p-4 ">
      <div className="border-b-2 border-black w-full font-medium my-4 text-4xl truncate max-md:text-2xl">
        <h1 className="truncate w-1/2">{course.name}</h1>
      </div>
      <div>
        {courseType === 'DadosGerais' ? (
          <>
            <ul className="inline-flex gap-3 mb-4">
              <button onClick={() => handleCourseType('DadosGerais')}>
                <li className="font-regular text-lg border-b-2 border-[#161250] max-sm:text-xs">
                  Dados gerais
                </li>
              </button>
              <button onClick={() => handleCourseType('Participantes')}>
                <li className="max-sm:text-xs">Participantes</li>
              </button>
            </ul>
            <DataTable
              professorImg={course.professorImg}
              professorName={course.professorName}
              local={course.local}
            />
          </>
        ) : (
          <>
            <ul className="inline-flex gap-3 mb-4">
              <button onClick={() => handleCourseType('DadosGerais')}>
                <li className="max-sm:text-xs">Dados gerais</li>
              </button>
              <button onClick={() => handleCourseType('Participantes')}>
                <li className="font-regular  text-lg border-b-2 border-[#161250] max-sm:text-xs">
                  Participantes
                </li>
              </button>
            </ul>
            <StudentData id={params.id} data={students} />
          </>
        )}
      </div>
    </div>
  )
}
