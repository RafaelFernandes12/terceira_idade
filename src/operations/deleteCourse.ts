import { db, storage } from '@/config/firestore'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { deleteObject, listAll, ref } from 'firebase/storage'

export async function deleteCourse(id: string, name: string) {
  try {
    await deleteDoc(doc(db, 'courses', id))

    const courseImgRef = ref(storage, `courseImgs/${name}`)
    const courseImgs = (await listAll(courseImgRef)).items.map((img) => {
      const courseImgNameRef = ref(storage, `courseImgs/${name}/${img.name}`)
      return deleteObject(courseImgNameRef)
    })
    await Promise.all(courseImgs)

    const subCollectionOfCourseRef = collection(db, 'courses', id, 'students')
    const getSubcollectionOfCourseId = (
      await getDocs(subCollectionOfCourseRef)
    ).docs.map((id) => id.id)

    getSubcollectionOfCourseId.forEach(async (studentId) => {
      const studentsRef = doc(db, 'courses', id, 'students', studentId)
      await deleteDoc(studentsRef)

      const subCollectionOfStudentRef = collection(
        db,
        'students',
        studentId,
        'courses',
      )
      const getSubcollectionOfStudentDocs = (
        await getDocs(subCollectionOfStudentRef)
      ).docs

      getSubcollectionOfStudentDocs.forEach(async (docId) => {
        if (docId.id === id) {
          const subDocOfStudentRef = doc(
            db,
            'students',
            studentId,
            'courses',
            docId.id,
          )
          await deleteDoc(subDocOfStudentRef)
        }
      })
    })
  } catch (e) {
    console.error(e)
  }
}
