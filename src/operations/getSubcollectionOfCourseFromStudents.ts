import { db } from '@/config/firestore'
import { collection, getDocs } from 'firebase/firestore'

export async function getSubcollectionOfCourseFromStudents(id: string) {
  const docRef = collection(db, 'students', id, 'courses')
  const docsSnap = await getDocs(docRef)
  const coursesFromStudentData = docsSnap.docs.map((docs) => {
    const data = docs.data()
    const id = docs.id
    return {
      data,
      id,
    }
  })
  return coursesFromStudentData
}
