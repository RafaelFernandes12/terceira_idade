import { db, storage } from '@/config/firestore'
import { postStudentProps } from '@/types/studentProps'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid'

export async function createStudent(props: postStudentProps) {
  try {
    const valRef = collection(db, 'students')
    const querySnapshot = await getDocs(
      query(valRef, where('name', '==', props.name)),
    )

    if (!props.name) {
      throw new Error('Estudante tem que possuir um nome')
    }
    if (!querySnapshot.empty) {
      throw new Error('Estudante com o mesmo nome já existe')
    }

    const uploadTasks = [
      props.foto
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.foto,
          )
        : null,
      props.rgFrente
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.rgFrente,
          )
        : null,
      props.rgVerso
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.rgVerso,
          )
        : null,
      props.residencia
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.residencia,
          )
        : null,
      props.cardiologista
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.cardiologista,
          )
        : null,
      props.dermatologista
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.dermatologista,
          )
        : null,
      props.vacina
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.vacina,
          )
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

    const docRef = await addDoc(valRef, {
      name: props.name,
      cpf: props.cpf,
      dataNascimento: props.dataNascimento,
      responsavelNome: props.responsavelNome,
      responsavelVinculo: props.responsavelVinculo,
      telefoneContato: props.telefoneContato,
      telefoneEmergencia: props.telefoneEmergencia,
      foto: downloadstudentURL,
      rgFrente: downloadrgFrenteURL,
      rgVerso: downloadrgVersoURL,
      residencia: downloadResidenciaURL,
      cardiologista: downloadCardiologistaURL,
      dermatologista: downloadDermatologistaURL,
      vacina: downloadVacinaURL,
    })
    await Promise.all(
      props.courseId!.map(async (course) => {
        const studentRef = doc(db, 'students', docRef.id)
        const subCollectionOfStudentsFromCourse = doc(
          db,
          'courses',
          course,
          'students',
          docRef.id,
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
          docRef.id,
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
