import { db } from '@/config/firestore'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface UpdatedCoursesStudentIdProps {
  studentId: string
  courseIds: string[]
}

export async function updateCourseSubcollection({
  studentId,
  courseIds,
}: UpdatedCoursesStudentIdProps) {
  try {
    courseIds.map(async (id) => {
      const subCollectionOfStudentsFromCourse = doc(
        db,
        'courses',
        id,
        'students',
        studentId,
      )
      const subCollectionOfCourseFromStudents = doc(
        db,
        'students',
        studentId,
        'courses',
        id,
      )
      const courseRef = doc(db, 'courses', id)
      await getDoc(courseRef).then(async (doc) => {
        const docData = doc.data()
        await setDoc(subCollectionOfCourseFromStudents, {
          courses: docData,
        })
      })
      const studentRef = doc(db, 'students', studentId)
      await getDoc(studentRef).then(async (doc) => {
        const docData = doc.data()
        await setDoc(subCollectionOfStudentsFromCourse, {
          students: docData,
        })
      })
    })
  } catch (error) {
    console.error('Error adding course IDs to the student:', error)
    throw error
  }
}
