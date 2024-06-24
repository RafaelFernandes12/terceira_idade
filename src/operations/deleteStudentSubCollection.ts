import { db } from '@/config/firestore'
import { deleteDoc, doc } from 'firebase/firestore'

interface UpdatedCoursesStudentIdProps {
  studentId: string
  courseIds: string[]
}

export async function deleteStudentSubCollection({
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
      await deleteDoc(subCollectionOfCourseFromStudents)
      await deleteDoc(subCollectionOfStudentsFromCourse)
    })
  } catch (error) {
    console.error('Error adding course IDs to the student:', error)
    throw error
  }
}
