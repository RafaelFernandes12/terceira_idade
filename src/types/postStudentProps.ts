import { imgType } from './imgType'

export interface postStudentProps {
  id?: string
  name: string
  cpf: string
  dataNascimento: string
  responsavelNome: string
  responsavelVinculo: string
  telefoneContato: string
  telefoneEmergencia: string
  foto: imgType
  vacina: imgType
  rgFrente: imgType
  rgVerso: imgType
  residencia: imgType
  cardiologista: imgType
  dermatologista: imgType
  courseId: string[]
}
