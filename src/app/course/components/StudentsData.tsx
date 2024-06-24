/* eslint-disable @next/next/no-img-element */
import { Person } from '@mui/icons-material'
import { DocumentData } from 'firebase/firestore'
import Link from 'next/link'

interface studentDataProps {
  students: DocumentData
}

export default function StudentData({ students }: studentDataProps) {
  return (
    <>
      {students.map((course: DocumentData) => {
        return (
          <div
            className="border-1 border-gray-500 rounded-3xl flex items-center p-4 my-6 max-md:text-xs"
            key={course.id}
          >
            <Link href={`/student/${course.id}`}>
              <img
                src={course.data.students.foto}
                alt=""
                className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
                ${course.data.students.foto ? '' : 'hidden'}`}
              />
              <Person
                className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
                ${course.data.students.foto ? 'hidden' : ''}`}
              />
            </Link>
            <div className="flex gap-2 flex-col ml-4">
              <span className="break-words w-96 max-sm:w-36">
                {course.data.students.name}
              </span>
              <span className="break-words w-96 max-sm:w-36">
                {course.data.students.cpf}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}
