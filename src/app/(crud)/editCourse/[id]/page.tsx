'use client'

import { ErrorText } from '@/components/ErrorText'
import { daysOfWeek, types } from '@/data'
import { editCourse } from '@/operations/editCourse'
import { idProps } from '@/types/idProps'
import { imgType } from '@/types/imgType'
import { localProps } from '@/types/localProps'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import { SubmitButton } from '../../components/SubmitButton'

export default function CreateCourse({ params }: idProps) {
  const [name, setName] = useState('')
  const [courseImg, setCourseImg] = useState<imgType>()
  const [professorName, setProfessorName] = useState('')
  const [professorImg, setProfessorImg] = useState<imgType>()
  const [error, setError] = useState('')
  const [type, setType] = useState('Extensão')
  const [local, setLocal] = useState<Array<localProps>>([])
  const id = params.id

  async function addCourse() {
    editCourse({
      courseId: id,
      name,
      courseImg,
      type,
      professorName,
      professorImg,
      local,
    })
      .then(() => {
        toast.success('Editado com sucesso', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      })
      .catch((e) => {
        setError(e.toString())
      })
  }

  function handleInputName(value: string) {
    setName(value)
  }
  function handleInputProfessorName(value: string) {
    setProfessorName(value)
  }
  function handleInputType(value: string) {
    setType(value)
  }

  function handleInputChange(
    index: number,
    propertyName: string,
    value: string,
  ) {
    setLocal((prevLocal) => {
      const updatedLocal = [...prevLocal]
      updatedLocal[index] = {
        ...updatedLocal[index],
        [propertyName]: value,
      }
      return updatedLocal
    })
  }
  function handleCreateNewLocal() {
    setLocal((prevLocal) => [
      ...prevLocal,
      { date: '', startHour: '', endHour: '', place: '' },
    ])
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-semibold text-2xl my-7">Editar curso</h1>
      <div className="mb-4">
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-baseline max-sm:gap-0 max-sm:mb-4">
          <InputField
            type="text"
            length={75}
            label="Nome:"
            value={name}
            onChange={handleInputName}
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
          onChange={handleInputType}
          itens={types}
        />
        <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-baseline max-sm:gap-0">
          <InputField
            type="text"
            length={75}
            label="Nome do Professor:"
            value={professorName}
            onChange={handleInputProfessorName}
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
        <div className="flex gap-4 items-center my-4 max-md:flex-col">
          {local.map((item, index) => (
            <div key={index}>
              <SelectField
                inputLabel="Dia"
                value={item.date}
                label="Dia"
                onChange={(e) => handleInputChange(index, 'date', e)}
                itens={daysOfWeek}
              />
              <div className="flex flex-col">
                <label>Hora de começo curso:</label>
                <TextField
                  type="time"
                  value={item.startHour}
                  onChange={(e) =>
                    handleInputChange(index, 'startHour', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Hora de fim curso:</label>
                <TextField
                  type="time"
                  value={item.endHour}
                  onChange={(e) =>
                    handleInputChange(index, 'endHour', e.target.value)
                  }
                />
              </div>
              <InputField
                type="text"
                length={20}
                label="Lugar do curso:"
                value={item.place}
                onChange={(e: string) => handleInputChange(index, 'place', e)}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-black rounded-md p-2 text-white"
          onClick={handleCreateNewLocal}
        >
          Adicionar Local
        </button>
      </div>
      <SubmitButton text="Editar" onClick={addCourse} path="/" />
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
  )
}