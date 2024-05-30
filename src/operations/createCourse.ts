import { db, storage } from '@/config/firestore'
import { postCourseProps } from '@/types/postCourseProps'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid'

export async function createCourse(course: postCourseProps) {
  const coursesRef = collection(db, 'courses')
  const querySnapshot = await getDocs(
    query(coursesRef, where('name', '==', course.name)),
  )
  if (!querySnapshot.empty) {
    throw new Error('Curso com o mesmo nome já existe')
  }
  if (course.name === '') {
    throw new Error('Curso precisa de um nome')
  }

  const uploadTasks = [
    course.courseImg
      ? uploadBytes(ref(storage, `studentImgs/${uniqid()}`), course.courseImg)
      : null,
    course.professorImg
      ? uploadBytes(
          ref(storage, `studentImgs/${uniqid()}`),
          course.professorImg,
        )
      : null,
  ]

  const [courseSnapshot, professorSnapshot] = await Promise.all(uploadTasks)

  const downloadCourseURL = courseSnapshot
    ? await getDownloadURL(courseSnapshot.ref)
    : null
  const downloadProfessorURL = professorSnapshot
    ? await getDownloadURL(professorSnapshot.ref)
    : null

  await addDoc(collection(db, 'courses'), {
    name: course.name,
    courseImg: downloadCourseURL,
    type: course.type,
    professorName: course.professorName,
    professorImg: downloadProfessorURL,
    local: course.local,
    studentId: [],
  })
}
