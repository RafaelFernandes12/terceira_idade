'use client'

import { ErrorText } from '@/components/ErrorText'
import { editStudent } from '@/operations/editStudent'
import { getCourses } from '@/operations/getCourses'
import { idDataProps } from '@/types/idDataProps'
import { idProps } from '@/types/idProps'
import { imgType } from '@/types/imgType'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputField from '../../components/InputField'
import { SubmitButton } from '../../components/SubmitButton'

export default function EditStudent({ params }: idProps) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [foto, setFoto] = useState<imgType>()
  const [rgFrente, setRgFrente] = useState<imgType>()
  const [rgVerso, setRgVerso] = useState<imgType>()
  const [residencia, setResidencia] = useState<imgType>()
  const [cardiologista, setCardiologista] = useState<imgType>()
  const [dermatologista, setDermatologista] = useState<imgType>()
  const [vacina, setVacina] = useState<imgType>()
  const [dataNascimento, setDataNascimento] = useState('')
  const [responsavelNome, setResponsavelNome] = useState('')
  const [responsavelVinculo, setResponsavelVinculo] = useState('')
  const [telefoneContato, setTelefoneContato] = useState('')
  const [telefoneEmergencia, setTelefoneEmergencia] = useState('')
  const [error, setError] = useState('')
  const [courses, setCourses] = useState<idDataProps[]>([])
  const [courseId, setCourseId] = useState<string[]>([])
  const id = params.id

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response)
    })
  }, [])

  async function editStudentDocs() {
    setError('')
    editStudent({
      id,
      name,
      cpf,
      dataNascimento,
      responsavelNome,
      responsavelVinculo,
      telefoneContato,
      telefoneEmergencia,
      foto,
      courseId,
      rgFrente,
      rgVerso,
      residencia,
      cardiologista,
      dermatologista,
      vacina,
    })
      .then(() => {
        toast.success('Criado com sucesso', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          progress: undefined,
          theme: 'colored',
        })
      })
      .catch((e) => {
        setError(e.toString())
      })
  }
  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-semibold text-2xl my-7">Editar Estudante</h1>
      <div className="mb-4">
        <div className="flex items-center gap-6 max-sm:flex-col">
          <InputField
            type="text"
            length={75}
            label="Nome:"
            value={name}
            onChange={(e) => setName(e)}
          />
          <div className="w-full flex flex-col">
            <label>Foto do estudante: </label>
            <input
              type="file"
              onChange={(e) => setFoto(e.currentTarget.files![0])}
            />
          </div>
        </div>
        <FormControl sx={{ minWidth: 120 }} className="w-full">
          <InputLabel>Curso</InputLabel>
          <Select
            multiple
            value={courseId}
            label="Curso"
            onChange={(e: SelectChangeEvent<string[]>) =>
              setCourseId(e.target.value as string[])
            }
          >
            {courses.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.data.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <InputField
          type="text"
          length={11}
          label="CPF:"
          value={cpf}
          onChange={(e) => setCpf(e)}
        />

        <InputField
          type="date"
          length={6}
          label=""
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e)}
        />
        <InputField
          type="text"
          length={75}
          label="Nome do responsável:"
          value={responsavelNome}
          onChange={(e) => setResponsavelNome(e)}
        />

        <InputField
          type="text"
          length={75}
          label="Vínculo do responsável:"
          value={responsavelVinculo}
          onChange={(e) => setResponsavelVinculo(e)}
        />

        <InputField
          type="text"
          length={11}
          label="Telefone de contato:"
          value={telefoneContato}
          onChange={(e) => setTelefoneContato(e)}
        />

        <InputField
          type="text"
          length={11}
          label="Telefone de emergência:"
          value={telefoneEmergencia}
          onChange={(e) => setTelefoneEmergencia(e)}
        />
        <div className="flex flex-col gap-2">
          <label>Foto do rg(verso): </label>
          <input
            type="file"
            onChange={(e) => setRgFrente(e.currentTarget.files![0])}
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do rg(verso): </label>
          <input
            type="file"
            onChange={(e) => setRgVerso(e.currentTarget.files![0])}
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do comprovante de residencia: </label>
          <input
            type="file"
            onChange={(e) => setResidencia(e.currentTarget.files![0])}
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do cardiologista: </label>
          <input
            type="file"
            onChange={(e) => setCardiologista(e.currentTarget.files![0])}
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do dermatologista: </label>
          <input
            type="file"
            onChange={(e) => setDermatologista(e.currentTarget.files![0])}
            className="mb-2 max-sm:text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Foto do passporte de vacinação: </label>
          <input
            type="file"
            onChange={(e) => setVacina(e.currentTarget.files![0])}
            className="mb-2 max-sm:text-xs"
          />
        </div>
      </div>
      <SubmitButton text="Editar" onClick={editStudentDocs} path="/students" />
      <ErrorText error={error} />
    </div>
  )
}
