"use client";

import { ErrorText } from "@/components/ErrorText";
import { daysOfWeek, hoursOfClass, types } from "@/data";
import { createCourse } from "@/operations/createCourse";
import { imgType } from "@/types/imgType";
import { localProps } from "@/types/localProps";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { SubmitButton } from "../components/SubmitButton";
import { getAllSemesters } from "@/operations/getAllSemesters";
import { Modal } from "../components/Modal";
import { semesterProps } from "@/types/semester";

export default function CreateCourse() {
  const [name, setName] = useState("");
  const [courseImg, setCourseImg] = useState<imgType>();
  const [professorName, setProfessorName] = useState("");
  const [professorImg, setProfessorImg] = useState<imgType>();
  const [type, setType] = useState("Extensão");
  const [local, setLocal] = useState<Array<localProps>>([]);
  const [semesters, setSemesters] = useState<semesterProps[]>([]);
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    getAllSemesters().then((response) => {
      setSemesters(response);
    });
  }, []);
  async function addCourse() {
    createCourse(
      {
        name,
        courseImg,
        type,
        professorName,
        professorImg,
        local,
      },
      semesterId,
    )
      .then(() => {
        toast.success("Criado com sucesso");
      })
      .catch((e) => {
        toast.error(e.toString());
        console.log(e);
      });
  }
  function handleInputChange(
    index: number,
    propertyName: string,
    value: string,
  ) {
    setLocal((prevLocal) => {
      const updatedLocal = [...prevLocal];
      updatedLocal[index] = {
        ...updatedLocal[index],
        [propertyName]: value,
      };
      return updatedLocal;
    });
  }
  function handleCreateNewLocal() {
    setLocal((prevLocal) => [...prevLocal, { date: "", hour: "", place: "" }]);
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="font-semibold text-2xl my-7">Criar curso</h1>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-baseline max-sm:gap-0 max-sm:mb-4">
          <InputField
            type="text"
            length={75}
            label="Nome:"
            value={name}
            onChange={(e) => setName(e)}
          />
          <div className="flex flex-col">
            <label>Foto do curso: </label>
            <input
              type="file"
              onChange={(e) => setCourseImg(e.currentTarget.files![0])}
              className="mb-2 max-sm:text-xs"
            />
          </div>
        </div>
        <SelectField
          inputLabel="Tipo"
          value={type}
          label="Extensão"
          onChange={(e) => setType(e)}
          itens={types}
        />
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-baseline max-sm:gap-0">
          <InputField
            type="text"
            length={75}
            label="Nome do Professor:"
            value={professorName}
            onChange={(e) => setProfessorName(e)}
          />
          <div className="flex flex-col">
            <label>Foto do professor do curso: </label>
            <input
              type="file"
              onChange={(e) => setProfessorImg(e.currentTarget.files![0])}
              className="mb-2 max-sm:text-xs"
            />
          </div>
        </div>
        <SelectField
          inputLabel="Semestre"
          value={semesterId}
          label="Semestre"
          onChange={(e) => setSemesterId(e)}
          itens={semesters.map((item) => item.year)}
        />
        <Modal />
        <div className="flex gap-4 items-center my-4 max-md:flex-col">
          {local.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <SelectField
                inputLabel="Dia"
                value={item.date}
                label="Dia"
                onChange={(e) => handleInputChange(index, "date", e)}
                itens={daysOfWeek}
              />
              <SelectField
                inputLabel="Hora"
                value={item.hour}
                label="Hora"
                onChange={(e) => handleInputChange(index, "hour", e)}
                itens={hoursOfClass}
              />
              <InputField
                type="text"
                length={20}
                label="Lugar do curso:"
                value={item.place}
                onChange={(e: string) => handleInputChange(index, "place", e)}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-darkBlue w-36 rounded-md text-white p-2 mr-4"
          onClick={handleCreateNewLocal}
        >
          Adicionar Local
        </button>
      </div>
      <SubmitButton text="Criar" onClick={addCourse} path="/" />
    </div>
  );
}
