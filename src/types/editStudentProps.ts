export interface editStudentProps {
  id?: string
  name: string
  cpf: string
  dataNascimento: string
  responsavelNome: string
  responsavelVinculo: string
  telefoneContato: string
  telefoneEmergencia: string
  foto: string | undefined | null
  vacina: string | undefined | null
  rgFrente: string | undefined | null
  rgVerso: string | undefined | null
  residencia: string | undefined | null
  cardiologista: string | undefined | null
  dermatologista: string | undefined | null
  courseId: string[]
}
