import { getStudent } from "@/operations/getStudent";

interface IdProps {
  params: {
    id: string
  }
}

export default async function Student({params}: IdProps) {

  const student = await getStudent(params.id);

  return (
    <div>
      {student ?
        <div className="">
          <h1>Dados Pessoais</h1>
          <hr/>
          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={student.foto} alt="" className="w-40 h-40"/>
            <p>Nome : {student.name}</p>
          </div>
          <hr/>
          <div>
            <p>Idade : </p>
            <p>CPF : {student.cpf}</p>
            <p>Data de nascimento : {student.data_nascimento}</p>
            <p>Tel. Contato : {student.telefone_contato}</p>
          </div>
          <hr/>
          <div>
            <h2>Contato Emergência</h2>
            <p>Nome : {student.responsavel_nome}</p>
            <p>Vínculo : {student.responsavel_vinculo}</p>
            <p>Tel. Emergência : {student.telefone_emergencia}</p>
          </div>
        </div>
        : <p>Aluno não encontrado</p> }
    </div>
  );
}