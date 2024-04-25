import { getCourses } from "@/operations/getCourses";
import { getStudent } from "@/operations/getStudent";
import { Person } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import { ClassTime } from "../components/ClassTime";
import { ContentBox } from "../components/ContentBox";
import { TableRow } from "../components/TableRow";

interface IdProps {
  params: {
    id: string
  }
}

export default async function Student({params}: IdProps) {

  const id = params.id;
  const student = await getStudent(id);
  const courses = await getCourses();
  
  return (
    <div>
      <div className={`m-auto rounded-2xl w-full p-2 pb-6 bg-red-500/20 mb-10
      ${student!.foto || student!.cardiologista || student!.dermatologista || student!.vacina  ? "": "hidden"}`}
      >
        <div className="flex items-center gap-2">
          <ErrorIcon className="text-red-500 rounded-full w-7 h-7"/>
          <p className="text-red-500 font-semibold">Atenção!</p>
        </div>
        <p className="opacity-100">O idoso pussui pendências em sua documentação.</p>
      </div>
      {student ?
        <div className="flex flex-col gap-10">
          <ContentBox title="Dados pessoais">
            <div className="flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={student.foto} alt='' className={`w-40 h-40 rounded-full max-sm:w-20 max-sm:h-20 
                ${student.foto.includes("generic") ? "hidden" : "" }`}/>
              <Person className={`w-40 h-40 rounded-full max-sm:w-20 max-sm:h-20 
                ${student.foto.includes("generic") ? "" : "hidden" }`}/>
              <p>{student.name}</p>
              
            </div>
            <hr className="border-black"/>
            <div className="p-4 flex flex-col gap-3">
              <p>Idade : </p>
              <p>CPF : {student.cpf}</p>
              <p>Data de nascimento : {student.data_nascimento}</p>
              <p>Tel. Contato : {student.telefone_contato}</p>
            </div>
            <hr className="border-black"/>
            <div className="p-4 flex flex-col gap-3">
              <h2 className="font-semibold">Contato Emergência</h2>
              <p>Nome : {student.responsavel_nome}</p>
              <p>Vínculo : {student.responsavel_vinculo}</p>
              <p>Tel. Emergência : {student.telefone_emergencia}</p>
            </div>
          </ContentBox>
          
          <ContentBox title="Atividade">
            <ClassTime data={courses} id={student.courseId?.map(item => item)} />
          </ContentBox>
          
          <ContentBox title="Documentação">
            <table className="mb-10 m-auto w-11/12 mt-8">
              <tbody>
                <TableRow title="FOTO 3X4" data="student.foto"/>
                <TableRow title="CÓPIA DO RG (FRENTE)" data={student.rg_frente!}/>
                <TableRow title="CÓPIA DO RG (VERSO)" data={student.rg_verso!}/>
                <TableRow title="COMPROVANTE DE RESIDÊNCIA" data={student.residencia!}/>
                <TableRow title="PASSAPORTE VACINAL" data={student.vacina!}/>
                <TableRow title="ATESTADO CARDIOLOGISTA" data={student.cardiologista!}/>
                <TableRow title="ATESTADO DERMATOLOGISTA" data={student.dermatologista!}/>
              </tbody>
            </table>
          </ContentBox>
        </div>
        : <p>Aluno não encontrado</p> }
    </div>
  );
}