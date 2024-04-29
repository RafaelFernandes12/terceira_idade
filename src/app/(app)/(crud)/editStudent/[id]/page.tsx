"use client";

import { ErrorText } from "@/components/ErrorText";
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

export default function EditStudent({params}: idProps) {

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [foto, setFoto] = useState<any>("generic");
  const [rg_frente, setRg_frente] = useState<any>("generic");
  const [rg_verso, setRg_verso] = useState<any>("generic");
  const [residencia, setResidencia] = useState<any>("generic");
  const [cardiologista, setCardiologista] = useState<any>("generic");
  const [dermatologista, setDermatologista] = useState<any>("generic");
  const [vacina, setVacina] = useState<any>("generic");
  const [data_nascimento, setData_nascimento] = useState("");
  const [responsavel_nome, setResponsavel_nome] = useState("");
  const [responsavel_vinculo, setResponsavel_vinculo] = useState("");
  const [telefone_contato, setTelefone_contato] = useState("");
  const [telefone_emergencia, setTelefone_emergencia] = useState("");
  const [error, setError] = useState("");
  const [courses,setCourses] = useState<idDataProps[]>([]);
  const [courseId, setCourseId] = useState<string[]>([]);
  const id = params.id;

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



  async function addStudent() {
    editStudent({ studentId: id, name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, 
      telefone_contato, telefone_emergencia,foto,courseId, rg_frente, rg_verso, 
      residencia, cardiologista, dermatologista,vacina}).then(() => {
      toast.success("Editado com sucesso", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }).catch(e => {
      setError(e.toString());
    });
  }
  return (
    <div className='flex flex-col justify-center'>
      <h1 className='font-semibold text-2xl my-7'>Editar Estudante</h1>
      <div className='mb-4'>
        <div className="flex items-center gap-6 max-sm:flex-col">
          <InputField
            length={30}
            type="text"
            label='Nome:'
            value={name}
            onChange={handleInputName}
          />
          <div className="w-full flex flex-col">
            <label>Foto do estudante: </label>
            <input type='file'

              onChange={e => setFoto(e.currentTarget.files![0])} 
            />
          </div>
        </div>
        <FormControl sx={{ minWidth: 120}} className="w-full">
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
        <InputField
          length={11}
          type="text"
          label='CPF:'
          value={cpf}
          onChange={handleInputCpf}
        />

        <InputField
          length={8}
          type="date"
          label=''
          value={data_nascimento}
          onChange={handleInputData_nascimento}
        />

        <InputField
          length={30}
          type="text"
          label='Nome do responsável:'
          value={responsavel_nome}
          onChange={handleInputResponsavel_nome}
        />

        <InputField
          length={30}
          type="text"
          label='Vínculo do responsável:'
          value={responsavel_vinculo}
          onChange={handleInputResponsavel_vinculo}
        />

        <InputField
          length={11}
          type="text"
          label='Telefone de contato:'
          value={telefone_contato}
          onChange={handleInputTelefone_contato}
        />

        <InputField
          length={11}
          type="text"
          label='Telefone de emergência:'
          value={telefone_emergencia}
          onChange={handleInputTelefone_emergencia}
        />
        <div className="flex flex-col gap-2">
          <label>Foto do rg(verso): </label>
          <input
            type='file' 
            onChange={e => setRg_frente(e.currentTarget.files![0])} 
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do rg(verso): </label>
          <input
            type='file' 
            onChange={e => setRg_verso(e.currentTarget.files![0])} 
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do comprovante de residencia: </label>
          <input
            type='file' 
            onChange={e => setResidencia(e.currentTarget.files![0])} 
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do cardiologista: </label>
          <input
            type='file' 
            onChange={e => setCardiologista(e.currentTarget.files![0])} 
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do dermatologista: </label>
          <input
            type='file' 
            onChange={e => setDermatologista(e.currentTarget.files![0])} 
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do passporte de vacinação: </label>
          <input
            type='file' 
            onChange={e => setVacina(e.currentTarget.files![0])} 
            className="mb-2 max-sm:text-xs"
          />
        </div>
      </div>
      <SubmitButton text="Editar" onClick={addStudent} path="/students"/>
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
