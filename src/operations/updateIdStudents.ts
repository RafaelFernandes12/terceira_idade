import { db } from '@/config/firestore'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

interface UpdatedCoursesStudentIdProps {
  studentId: string
  courseIds: string[]
}

export async function updateIdStudents({
  studentId,
  courseIds,
}: UpdatedCoursesStudentIdProps) {
  try {
    const studentRef = doc(db, 'students', studentId)
    const studentDoc = await getDoc(studentRef)
    const existingCourseIds = studentDoc?.data()?.courseId || []

    const uniqueCourseIds = courseIds.filter(
      (courseId) => !existingCourseIds.includes(courseId),
    )
    const updatedCourseIds = [...existingCourseIds, ...uniqueCourseIds]

    await updateDoc(studentRef, { courseId: updatedCourseIds })
  } catch (error) {
    console.error('Error adding course IDs to the student:', error)
    throw error
  }
}
