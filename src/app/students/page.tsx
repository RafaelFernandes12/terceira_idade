import { SearchBar } from '@/components/SearchBar'
import { ThreeDots } from '@/components/ThreeDots'
import { deleteStudent } from '@/operations/deleteStudent'
import { getStudents } from '@/operations/getStudents'
import { Person } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import ErrorIcon from '@mui/icons-material/Error'
import Link from 'next/link'

export default async function Students({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ''
  const students = await getStudents()

  const filteredStudents = students.filter((course) => {
    return course.data.name.toLowerCase().includes(query.toLowerCase())
  })
  return (
    <>
      <SearchBar />
      <div className="flex justify-end">
        <Link
          href="createStudent"
          className="bg-darkBlue text-white rounded-lg p-1 px-4 flex justify-between items-center w-fit max-sm:p-0.5"
        >
          <p className="max-sm:hidden">Criar estudante</p>
          <AddIcon />
        </Link>
      </div>
      {filteredStudents.map((response) => {
        return (
          <div
            key={response.id}
            className="flex items-center justify-between border-1 border-gray-500 rounded-3xl p-4 my-6 "
          >
            <Link href={`/student/${response.id}`} className="">
              <ErrorIcon
                className={`text-red-500 ${
                  response.data.cardiologista ||
                  response.data.residencia ||
                  response.data.dermatologista ||
                  response.data.rg_frente ||
                  response.data.rg_verso ||
                  response.data.vacina
                    ? 'hidden'
                    : ''
                }`}
              />
              <div className="flex gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={response.data.foto}
                  alt=""
                  className={`w-32 h-32 rounded-full bg-contain max-sm:w-20 max-sm:h-20 
                    ${response.data.foto ? '' : 'hidden'}`}
                />
                <Person
                  className={`w-32 h-32 rounded-full bg-contain max-sm:w-20 max-sm:h-20 
                    ${response.data.foto ? 'hidden' : ''}`}
                />
                <div className="flex gap-2 flex-col ml-4 max-sm:text-xs">
                  <p className="w-96 max-sm:w-36 break-words">
                    {response.data.name}
                  </p>
                  <p>CPF: {response.data.cpf}</p>
                </div>
              </div>
            </Link>
            <ThreeDots
              id={response.id}
              edit="editStudent"
              paths={[
                response.data.foto,
                response.data.rg_frente,
                response.data.rg_verso,
                response.data.residencia,
                response.data.cardiologista,
                response.data.dermatologista,
                response.data.vacina,
              ]}
              remove={deleteStudent}
              isStudent={true}
            />
          </div>
        )
      })}
    </>
  )
}
