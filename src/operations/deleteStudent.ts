'use server'
import { db, storage } from '@/config/firestore'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { deleteObject, listAll, ref } from 'firebase/storage'

export async function deleteStudent(id: string, name: string) {
  try {
    const studentRef = doc(db, 'students', id)
    await deleteDoc(studentRef)

    const studentImgRef = ref(storage, `studentImgs/${name}`)
    const studentImgs = (await listAll(studentImgRef)).items.map((img) => {
      const studentImgNameRef = ref(storage, `studentImgs/${name}/${img.name}`)
      return deleteObject(studentImgNameRef)
    })

    const subCollectionOfCourseRef = collection(db, 'students', id, 'courses')
    const getSubcollectionOfStudentId = (
      await getDocs(subCollectionOfCourseRef)
    ).docs.map((id) => id.id)

    getSubcollectionOfStudentId.forEach(async (courseId) => {
      const courseRef = doc(db, 'students', id, 'courses', courseId)
      await deleteDoc(courseRef)

      const subCollectionOfCourseRef = collection(
        db,
        'courses',
        courseId,
        'students',
      )
      const getSubcollectionOfCourseDocs = (
        await getDocs(subCollectionOfCourseRef)
      ).docs

      getSubcollectionOfCourseDocs.forEach(async (docId) => {
        if (docId.id === id) {
          const subDocOfStudentRef = doc(
            db,
            'courses',
            courseId,
            'students',
            docId.id,
          )
          await deleteDoc(subDocOfStudentRef)
        }
      })
    })
    await Promise.all(studentImgs)
  } catch (e) {
    console.log(e)
  }
}
