"use client";

import { ErrorText } from "@/components/ErrorText";
import { editCourseStudentId } from "@/operations/editCourseStudentId";
import { editStudent } from "@/operations/editStudent";
import { getCourses } from "@/operations/getCourses";
import { idDataProps } from "@/types/idDataProps";
import { idProps } from "@/types/idProps";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../components/InputField";
import { SubmitButton } from "../../components/SubmitButton";



export default function EditStudent({params}:idProps) {

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [foto, setFoto] = useState<any>("generic");
  const [data_nascimento, setData_nascimento] = useState("");
  const [responsavel_nome, setResponsavel_nome] = useState("");
  const [responsavel_vinculo, setResponsavel_vinculo] = useState("");
  const [telefone_contato, setTelefone_contato] = useState("");
  const [telefone_emergencia, setTelefone_emergencia] = useState("");
  const [error, setError] = useState("");
  const [courses,setCourses] = useState<idDataProps[]>([]);
  const [courseId, setCourseId] = useState<string[]>([]);
  
  function handleInputName(value: string) { setName(value); }
  function handleInputCpf(value: string) { setCpf(value); }
  function handleInputData_nascimento(value: string) { setData_nascimento(value); }
  function handleInputResponsavel_nome(value: string) { setResponsavel_nome(value); }
  function handleInputResponsavel_vinculo(value: string) { setResponsavel_vinculo(value); }
  function handleInputTelefone_contato(value: string) { setTelefone_contato(value); }
  function handleInputTelefone_emergencia(value: string) { setTelefone_emergencia(value); }



  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response);
    });
  },[]);

  const studentId = params.id;

  async function addStudent() {
    if (name) {
      editStudent({ studentId, name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, 
        telefone_contato, telefone_emergencia,foto,courseId });
      toast.success("Criado com sucesso", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if(courseId.length < 0){
        courseId.map(id => {
          editCourseStudentId({courseId:id});
        });
      }

    } else {
      setError("Todos os campos devem estar preenchidos");
    }
  }
  return (
    <div className='flex flex-col justify-center'>
      <h1 className='font-semibold text-2xl my-7'>Adicionar Estudante</h1>
      <div className='mb-4'>
        <InputField
          label='Nome:'
          value={name}
          onChange={handleInputName}
        />
        <FormControl sx={{ minWidth: 120}} size="medium">
          <InputLabel>Curso</InputLabel>
          <Select
            multiple
            value={courseId}
            label="Curso"
            onChange={(e: any) => setCourseId(e.target.value as string[])}
          >
            {courses.map(item => {
              return <MenuItem key={item.id} value={item.id}>{item.data.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <input
          placeholder=''
          type='file' 
          onChange={e => setFoto(e.currentTarget.files![0])} 
        />
        <InputField
          label='CPF:'
          value={cpf}
          onChange={handleInputCpf}
        />

        <InputField
          label='Data de nascimento:'
          value={data_nascimento}
          onChange={handleInputData_nascimento}
        />

        <InputField
          label='Nome do responsável:'
          value={responsavel_nome}
          onChange={handleInputResponsavel_nome}
        />

        <InputField
          label='Vínculo do responsável:'
          value={responsavel_vinculo}
          onChange={handleInputResponsavel_vinculo}
        />

        <InputField
          label='Telefone de contato:'
          value={telefone_contato}
          onChange={handleInputTelefone_contato}
        />

        <InputField
          label='Telefone de emergência:'
          value={telefone_emergencia}
          onChange={handleInputTelefone_emergencia}
        />

      </div>
      <SubmitButton text="Criar" onClick={addStudent} path="/students"/>
      <ErrorText error={error} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
