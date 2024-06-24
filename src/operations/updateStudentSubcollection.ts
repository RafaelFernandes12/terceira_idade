import { db } from '@/config/firestore'
import { doc, getDoc, setDoc } from 'firebase/firestore'

interface UpdatedStudentsCourseIdProps {
  courseId: string
  studentId: string[]
}

export async function updateStudentSubcollection({
  courseId,
  studentId,
}: UpdatedStudentsCourseIdProps) {
  try {
    studentId.map(async (studentId) => {
      const courseRef = doc(db, 'courses', courseId)
      const subCollectionOfCourseFromStudents = doc(
        db,
        'students',
        studentId,
        'courses',
        courseId,
      )
      const subCollectionOfStudentsFromCourse = doc(
        db,
        'courses',
        courseId,
        'students',
        studentId,
      )

      const studentRef = doc(db, 'students', studentId)
      await getDoc(studentRef).then(async (doc) => {
        const docData = doc.data()
        if (docData) {
          delete docData.courseId
          delete docData.courses
        }
        await setDoc(subCollectionOfStudentsFromCourse, {
          students: docData,
        })
      })
      await getDoc(courseRef).then(async (doc) => {
        const docData = doc.data()
        if (docData) {
          delete docData.studentId
          delete docData.students
        }
        await setDoc(subCollectionOfCourseFromStudents, {
          courses: docData,
        })
      })
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
