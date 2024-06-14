import { getCourse } from '@/operations/getCourse'
import { idProps } from '@/types/idProps'
import Link from 'next/link'
import DataTable from '../../components/DataTable'

export default async function DadosGerais({ params }: idProps) {
  const id = params.id
  const course = await getCourse(id)

  return (
    <div className="border-2 border-black rounded-lg p-4 ">
      <div className="border-b-2 border-black w-full font-medium my-4 text-4xl truncate max-md:text-2xl">
        <h1 className="truncate w-1/2">{course.name}</h1>
      </div>
      <div>
        <ul className="inline-flex gap-3 mb-4">
          <Link href="dadosGerais">
            <li className="font-regular text-lg border-b-2 border-[#161250] max-sm:text-xs">
              Dados gerais
            </li>
          </Link>
          <Link href="participantes">
            <li className="max-sm:text-xs">Participantes</li>
          </Link>
        </ul>
        <DataTable
          professorImg={course.professorImg}
          professorName={course.professorName}
          local={course.local}
        />
      </div>
    </div>
  )
}
