import { db } from '@/config/firestore'
import { collection, getDocs } from 'firebase/firestore'

export async function getSubcollectionOfCourse(id: string) {
  const docRef = collection(db, 'courses', id, 'students')
  const docsSnap = await getDocs(docRef)
  const studentsFromCourseData = docsSnap.docs.map((docs) => {
    const data = docs.data()
    const id = docs.id
    return {
      data,
      id,
    }
  })
  return studentsFromCourseData
}
