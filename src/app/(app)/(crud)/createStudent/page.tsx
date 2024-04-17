"use client";

import { ErrorText } from "@/components/ErrorText";
import { createStudent } from "@/operations/createStudent";
import { useState } from "react";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";

export default function CreateCourse() {

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [foto, setFoto] = useState<any>();
  const [data_nascimento, setData_nascimento] = useState("");
  const [responsavel_nome, setResponsavel_nome] = useState("");
  const [responsavel_vinculo, setResponsavel_vinculo] = useState("");
  const [telefone_contato, setTelefone_contato] = useState("");
  const [telefone_emergencia, setTelefone_emergencia] = useState("");
  const [error, setError] = useState("");

  function handleInputName(value: string) { setName(value); }
  function handleInputCpf(value: string) { setCpf(value); }
  function handleInputData_nascimento(value: string) { setData_nascimento(value); }
  function handleInputResponsavel_nome(value: string) { setResponsavel_nome(value); }
  function handleInputResponsavel_vinculo(value: string) { setResponsavel_vinculo(value); }
  function handleInputTelefone_contato(value: string) { setTelefone_contato(value); }
  function handleInputTelefone_emergencia(value: string) { setTelefone_emergencia(value); }

  async function addStudent(e: any) {
    if (name ) {
      createStudent({ name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia,foto });
      console.log("hello");
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
      <SubmitButton onClick={addStudent} path="/students"/>
      <ErrorText error={error} />
    </div>
  );
}
