import { db } from '@/config/firestore'
import { getStudentProps } from '@/types/studentProps'
import { doc, getDoc } from 'firebase/firestore'

export async function getStudent(id: string): Promise<getStudentProps> {
  const docRef = doc(db, 'students', id)
  const docSnap = await getDoc(docRef)

  const data = docSnap.data() as getStudentProps

  const student: getStudentProps = {
    name: data.name,
    cpf: data.cpf,
    dataNascimento: data.dataNascimento,
    responsavelNome: data.responsavelNome,
    responsavelVinculo: data.responsavelVinculo,
    telefoneContato: data.telefoneContato,
    telefoneEmergencia: data.telefoneEmergencia,
    foto: data.foto,
    rgFrente: data.rgFrente,
    rgVerso: data.rgVerso,
    residencia: data.residencia,
    cardiologista: data.cardiologista,
    dermatologista: data.dermatologista,
    vacina: data.vacina,
    courseId: data.courseId,
    courses: data.courses,
  }

  return student
}
