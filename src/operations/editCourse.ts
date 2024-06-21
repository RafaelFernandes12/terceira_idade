import { db, storage } from '@/config/firestore'
import { editCourseProps, postCourseProps } from '@/types/courseProps'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid'

export async function editCourse({
  courseId,
  name,
  courseImg,
  type,
  professorName,
  professorImg,
  local,
}: postCourseProps) {
  try {
    const courseRef = doc(db, 'courses', courseId!)
    const courseDoc = await getDoc(courseRef)

    if (!courseDoc.exists()) {
      throw new Error('Course document does not exist.')
    }

    const uploadTasks = []
    if (courseImg) {
      const courseImgs = ref(storage, `courseImgs/${uniqid()}`)
      const courseSnapshot = uploadBytes(courseImgs, courseImg)
      uploadTasks.push(courseSnapshot)
    }
    if (professorImg) {
      const professorImgs = ref(storage, `courseImgs/${uniqid()}`)
      const professorSnapshot = uploadBytes(professorImgs, professorImg)
      uploadTasks.push(professorSnapshot)
    }
    const [courseSnapshot, professorSnapshot] = await Promise.all(uploadTasks)
    const downloadCourseURL = courseImg
      ? await getDownloadURL(courseSnapshot.ref)
      : undefined
    const downloadProfessorURL = professorImg
      ? await getDownloadURL(professorSnapshot.ref)
      : undefined

    const updateFields: Partial<editCourseProps> = {}
    if (name) updateFields.name = name
    if (downloadCourseURL) updateFields.courseImg = downloadCourseURL
    if (type) updateFields.type = type
    if (professorName) updateFields.professorName = professorName
    if (downloadProfessorURL) updateFields.professorImg = downloadProfessorURL
    if (local!.length > 0) updateFields.local = local

    await updateDoc(courseRef, updateFields)

    console.log('Course updated successfully.')
  } catch (error) {
    console.error('Error updating course:', error)
    throw error
  }
}
