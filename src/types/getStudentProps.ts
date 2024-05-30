export interface getStudentProps {
  id?: string
  name: string
  cpf: string
  dataNascimento: string
  responsavelNome: string
  responsavelVinculo: string
  telefoneContato: string
  telefoneEmergencia: string
  foto: string | undefined
  vacina: string | undefined
  rgFrente: string | undefined
  rgVerso: string | undefined
  residencia: string | undefined
  cardiologista: string | undefined
  dermatologista: string | undefined
  courseId: string[]
}
