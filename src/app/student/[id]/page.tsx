import { getStudent } from '@/operations/getStudent'
import { idProps } from '@/types/idProps'
import { Person } from '@mui/icons-material'
import ErrorIcon from '@mui/icons-material/Error'
import { ClassTime } from '../components/ClassTime'
import { ContentBox } from '../components/ContentBox'
import { TableRow } from '../components/TableRow'

export default async function Student({ params }: idProps) {
  const id = params.id
  const student = await getStudent(id)
  return (
    <div>
      <div
        className={`m-auto rounded-2xl w-full p-2 pb-6 bg-red-500/20 mb-10
      ${
        student.foto ||
        student.cardiologista ||
        student.dermatologista ||
        student.vacina ||
        student.residencia ||
        student.rgFrente ||
        student.rgVerso
          ? 'hidden'
          : ''
      }`}
      >
        <div className="flex items-center gap-2">
          <ErrorIcon className="text-red-500 rounded-full w-7 h-7" />
          <p className="text-red-500 font-semibold">Atenção!</p>
        </div>
        <p className="opacity-100">
          O idoso pussui pendências em sua documentação.
        </p>
      </div>
      {student ? (
        <div className="flex flex-col gap-10">
          <ContentBox title="Dados pessoais">
            <div className="flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={student.foto}
                alt=""
                className={`w-40 h-40 rounded-full max-sm:w-20 max-sm:h-20 
                ${student.foto ? '' : 'hidden'}`}
              />
              <Person
                className={`w-40 h-40 rounded-full max-sm:w-20 max-sm:h-20 
                ${student.foto ? 'hidden' : ''}`}
              />
              <p>{student.name}</p>
            </div>
            <hr className="border-black" />
            <div className="p-4 flex flex-col gap-3">
              <p>CPF : {student.cpf}</p>
              <p>Data de nascimento : {student.dataNascimento}</p>
              <p>Tel. Contato : {student.telefoneContato}</p>
            </div>
            <hr className="border-black" />
            <div className="p-4 flex flex-col gap-3">
              <h2 className="font-semibold">Contato Emergência</h2>
              <p>Nome : {student.responsavelNome}</p>
              <p>Vínculo : {student.responsavelVinculo}</p>
              <p>Tel. Emergência : {student.telefoneEmergencia}</p>
            </div>
          </ContentBox>

          <ContentBox title="Atividade">
            <ClassTime id={id} />
          </ContentBox>
          <ContentBox title="Documentação">
            <table className="mb-10 m-auto w-11/12 mt-8">
              <tbody>
                <TableRow
                  idHtml="file1"
                  id={id}
                  name="foto"
                  title="FOTO 3X4"
                  data={student.foto}
                />
                <TableRow
                  idHtml="file2"
                  id={id}
                  name="rg_frente"
                  title="CÓPIA DO RG (FRENTE)"
                  data={student.rgFrente}
                />
                <TableRow
                  idHtml="file3"
                  id={id}
                  name="rg_verso"
                  title="CÓPIA DO RG (VERSO)"
                  data={student.rgVerso}
                />
                <TableRow
                  idHtml="file4"
                  id={id}
                  name="residencia"
                  title="COMPROVANTE DE RESIDÊNCIA"
                  data={student.residencia}
                />
                <TableRow
                  idHtml="file5"
                  id={id}
                  name="vacina"
                  title="PASSAPORTE VACINAL"
                  data={student.vacina}
                />
                <TableRow
                  idHtml="file6"
                  id={id}
                  name="cardiologista"
                  title="ATESTADO CARDIOLOGISTA"
                  data={student.cardiologista}
                />
                <TableRow
                  idHtml="file7"
                  id={id}
                  name="dermatologista"
                  title="ATESTADO DERMATOLOGISTA"
                  data={student.dermatologista}
                />
              </tbody>
            </table>
          </ContentBox>
        </div>
      ) : (
        <p>Aluno não encontrado</p>
      )}
    </div>
  )
}
