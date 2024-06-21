import { db } from '@/config/firestore'
import { coursesSeed } from '@/mock/coursesSeed'
import { addDoc, collection } from 'firebase/firestore'

export async function createCourseSeed() {
  coursesSeed.forEach(async (obj) => {
    await addDoc(collection(db, 'courses'), {
      name: obj.name,
      courseImg: obj.courseImg,
      type: obj.type,
      professorName: obj.professorName,
      professorImg: obj.professorImg,
      local: obj.local,
      studentId: [],
    }).then((id) => console.log('id: ' + id.id))
  })
}
