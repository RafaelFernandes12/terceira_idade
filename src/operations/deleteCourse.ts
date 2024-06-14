'use server'
import { db, storage } from '@/config/firestore'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { deleteObject, listAll, ref } from 'firebase/storage'

export async function deleteCourse(id: string, ...paths: string[]) {
  await deleteDoc(doc(db, 'courses', id))

  const studentsRef = collection(db, 'students')
  const studentsQuery = query(
    studentsRef,
    where('courseId', 'array-contains', id),
  )
  const studentsSnapshot = await getDocs(studentsQuery)

  const courseImgRef = ref(storage, 'courseImgs')

  const items = await listAll(courseImgRef)

  const deletePromises = items.items.map(async (item) => {
    const desertRef = ref(storage, `courseImgs/${item.name}`)
    if (paths.some((path) => path.includes(item.name))) {
      return deleteObject(desertRef)
    }
  })

  await Promise.all(deletePromises)

  studentsSnapshot.forEach(async (studentDoc) => {
    const studentId = studentDoc.id
    const studentRef = doc(db, 'students', studentId)
    const studentData = studentDoc.data()
    const updatedCourseIds = studentData.courseId.filter(
      (courseId: string) => courseId !== id,
    )
    await updateDoc(studentRef, { courseId: updatedCourseIds })
  })
}
