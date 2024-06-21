import { SearchBar } from '@/components/SearchBar'
import { ThreeDots } from '@/components/ThreeDots'
import { deleteCourse } from '@/operations/deleteCourse'
import { getCourses } from '@/operations/getCourses'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css'

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ''

  const courses = await getCourses()

  const filteredCourses = courses.filter((course) => {
    return (
      course.data.name.toLowerCase().includes(query.toLowerCase()) &&
      course.data.type === 'Ensino'
    )
  })

  return (
    <div>
      <SearchBar />
      <div className="border-2 border-black rounded-lg p-4">
        <div className="flex justify-between mx-6 mb-10 mt-4">
          <ul className="inline-flex gap-3">
            <Link href="/">
              <li className="font-regular text-lg max-sm:text-sm ">Extensão</li>
            </Link>
            <Link href="/ensino">
              <li className="font-regular text-lg max-sm:text-sm border-b-[3px] border-darkBlue">
                Ensino
              </li>
            </Link>
          </ul>

          <Link
            href="createCourse"
            className="bg-darkBlue text-white rounded-lg p-1 px-6 flex justify-between items-center max-sm:p-0.5"
          >
            <p className="max-sm:hidden">Criar curso</p>
            <AddIcon />
          </Link>
        </div>

        <div className="grid 2xl:grid-cols-4 m-0 lg:grid-cols-3 md:grid-cols-2">
          {filteredCourses.map((response) => {
            return (
              <div
                key={response.id}
                className="w-52 h-52 flex items-center flex-col m-auto mb-14"
              >
                <Link
                  href={`course/${response.id}/dadosGerais  `}
                  className="bg-darkBlue/50 p-4 rounded-lg m-auto w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={response.data.courseImg}
                    alt=""
                    className={`object-cover w-full h-full 
                      ${response.data.courseImg ? '' : 'hidden'}`}
                  />
                  <div
                    className={`flex items-center justify-center h-full w-full
                      ${response.data.courseImg ? 'hidden' : ''}`}
                  >
                    <span
                      className={`text-center rotate-[315deg] w-full  
                      `}
                    >
                      Adicionar Foto do curso
                    </span>
                  </div>
                </Link>
                <div className="flex  items-center justify-between w-full">
                  <span className="w-full truncate">{response.data.name}</span>
                  <ThreeDots
                    id={response.id}
                    isStudent={false}
                    name={response.data.name}
                    edit="editCourse"
                    remove={deleteCourse}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
