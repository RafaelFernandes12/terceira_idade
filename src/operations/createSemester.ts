import { db } from '@/config/firestore'
import { semesterProps } from '@/types/semester'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export async function createSemester({ year, start, end }: semesterProps) {
  const semesterRef = doc(db, 'semesters', year)

  // Check if the semester already exists
  const semesterDoc = await getDoc(semesterRef)
  if (semesterDoc.exists()) {
    throw new Error('Semestre já existe')
  }

  // Create the semester document
  await setDoc(semesterRef, {
    year,
    start,
    end,
  })
}
