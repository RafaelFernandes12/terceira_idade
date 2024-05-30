import { db } from '@/config/firestore'
import getCourseProps from '@/types/getCourseProps'
import { doc, getDoc } from 'firebase/firestore'

export async function getCourse(id: string): Promise<getCourseProps> {
  const docRef = doc(db, 'courses', id)
  const docSnap = await getDoc(docRef)

  const data = docSnap.data() as getCourseProps

  const course: getCourseProps = {
    courseId: data.courseId,
    name: data.name,
    courseImg: data.courseImg,
    type: data.type,
    professorName: data.professorName,
    professorImg: data.professorImg,
    local: data.local,
    studentId: data.studentId,
  }

  return course
}
