import { db, storage } from '@/config/firestore'
import { editStudentProps, postStudentProps } from '@/types/studentProps'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid'

export async function editStudent(props: postStudentProps) {
  try {
    const valRef = doc(db, 'students', props.id!)
    const studentsRef = collection(db, 'students')
    const querySnapshot = await getDocs(
      query(studentsRef, where('name', '==', name)),
    )

    if (!querySnapshot.empty) {
      throw new Error('Estudante com o mesmo nome já existe')
    }

    const uploadTasks = [
      props.foto
        ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), props.foto)
        : null,
      props.rgFrente
        ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), props.rgFrente)
        : null,
      props.rgVerso
        ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), props.rgVerso)
        : null,
      props.residencia
        ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), props.residencia)
        : null,
      props.cardiologista
        ? uploadBytes(
            ref(storage, `studentImgs/${uniqid()}`),
            props.cardiologista,
          )
        : null,
      props.dermatologista
        ? uploadBytes(
            ref(storage, `studentImgs/${uniqid()}`),
            props.dermatologista,
          )
        : null,
      props.vacina
        ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), props.vacina)
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
      dermatologistaSnapshot
        ? getDownloadURL(dermatologistaSnapshot.ref)
        : null,
      vacinaSnapshot ? getDownloadURL(vacinaSnapshot.ref) : null,
    ])

    const updateFields: Partial<editStudentProps> = {}
    if (props.name) updateFields.name = props.name
    if (props.cpf) updateFields.cpf = props.cpf
    if (props.dataNascimento) updateFields.dataNascimento = props.dataNascimento
    if (props.responsavelNome)
      updateFields.responsavelNome = props.responsavelNome
    if (props.responsavelVinculo)
      updateFields.responsavelVinculo = props.responsavelVinculo
    if (props.telefoneContato)
      updateFields.telefoneContato = props.telefoneContato
    if (props.telefoneEmergencia)
      updateFields.telefoneEmergencia = props.telefoneEmergencia
    if (props.foto) updateFields.foto = downloadstudentURL
    if (props.rgFrente) updateFields.rgFrente = downloadrgFrenteURL
    if (props.rgVerso) updateFields.rgVerso = downloadrgVersoURL
    if (props.residencia) updateFields.residencia = downloadResidenciaURL
    if (props.cardiologista)
      updateFields.cardiologista = downloadCardiologistaURL
    if (props.dermatologista)
      updateFields.dermatologista = downloadDermatologistaURL
    if (props.vacina) updateFields.vacina = downloadVacinaURL

    await updateDoc(valRef, updateFields)

    await Promise.all(
      props.courseId!.map(async (course) => {
        const studentRef = doc(db, 'students', props.id!)
        const subCollectionOfStudentsFromCourse = doc(
          db,
          'courses',
          course,
          'students',
          props.id!,
        )
        await getDoc(studentRef).then(async (doc) => {
          const docData = doc.data()
          await setDoc(subCollectionOfStudentsFromCourse, {
            students: docData,
          })
        })

        const subCollectionOfCourseFromStudents = doc(
          db,
          'students',
          props.id!,
          'courses',
          course,
        )

        const courseRef = doc(db, 'courses', course)
        await getDoc(courseRef).then(async (doc) => {
          const docData = doc.data()
          await setDoc(subCollectionOfCourseFromStudents, {
            courses: docData,
          })
        })
      }),
    )
  } catch (e) {
    console.log(e)
  }
}
