import { db, storage } from '@/config/firestore'
import { postStudentProps } from '@/types/postStudentProps'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid'

export async function createStudent({
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
}: postStudentProps) {
  const valRef = collection(db, 'students')
  const studentsRef = collection(db, 'students')
  const querySnapshot = await getDocs(
    query(studentsRef, where('name', '==', name)),
  )

  if (!name) {
    throw new Error('Estudante tem que possuir um nome')
  }
  if (!querySnapshot.empty) {
    throw new Error('Estudante com o mesmo nome já existe')
  }

  const uploadTasks = [
    foto ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), foto) : null,
    rgFrente
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), rgFrente)
      : null,
    rgVerso
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), rgVerso)
      : null,
    residencia
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), residencia)
      : null,
    cardiologista
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), cardiologista)
      : null,
    dermatologista
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), dermatologista)
      : null,
    vacina
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), vacina)
      : null,
  ]

  const [
    fotoSnapshot,
    rgFrenteSnapshot,
    rgVersoSnapshot,
    residenciaSnapshot,
    cardiologistaSnapshot,
    dermatologistaSnapshot,
    vacinaSnapshot,
  ] = await Promise.all(uploadTasks)

  const [
    downloadstudentURL,
    downloadrgFrenteURL,
    downloadrgVersoURL,
    downloadResidenciaURL,
    downloadCardiologistaURL,
    downloadDermatologistaURL,
    downloadVacinaURL,
  ] = await Promise.all([
    fotoSnapshot ? getDownloadURL(fotoSnapshot.ref) : null,
    rgFrenteSnapshot ? getDownloadURL(rgFrenteSnapshot.ref) : null,
    rgVersoSnapshot ? getDownloadURL(rgVersoSnapshot.ref) : null,
    residenciaSnapshot ? getDownloadURL(residenciaSnapshot.ref) : null,
    cardiologistaSnapshot ? getDownloadURL(cardiologistaSnapshot.ref) : null,
    dermatologistaSnapshot ? getDownloadURL(dermatologistaSnapshot.ref) : null,
    vacinaSnapshot ? getDownloadURL(vacinaSnapshot.ref) : null,
  ])

  try {
    const docRef = await addDoc(valRef, {
      name,
      cpf,
      dataNascimento,
      responsavelNome,
      responsavelVinculo,
      telefoneContato,
      telefoneEmergencia,
      foto: downloadstudentURL,
      rgFrente: downloadrgFrenteURL,
      rgVerso: downloadrgVersoURL,
      residencia: downloadResidenciaURL,
      cardiologista: downloadCardiologistaURL,
      dermatologista: downloadDermatologistaURL,
      vacina: downloadVacinaURL,
      courseId,
    })

    const studentIds = await Promise.all(
      courseId!.map(async (course) => {
        const courseRef = doc(db, 'courses', course)
        const courseDoc = await getDoc(courseRef)
        const existingStudentIds = courseDoc?.data()?.studentId
        return { courseId: course, existingStudentIds }
      }),
    )

    await Promise.all(
      studentIds.map(async (studentIdObj) => {
        const { courseId, existingStudentIds } = studentIdObj
        const updatedStudentIds = [...existingStudentIds, docRef.id]
        const courseRef = doc(db, 'courses', courseId)
        await updateDoc(courseRef, { studentId: updatedStudentIds })
      }),
    )
  } catch (e) {
    console.log(e)
  }
}
