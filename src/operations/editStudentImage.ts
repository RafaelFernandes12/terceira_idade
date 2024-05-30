import { db, storage } from '@/config/firestore'
import { imgType } from '@/types/imgType'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid'

interface studentImageProps {
  id: string
  name: string
  img: imgType
}

export async function editStudentImage({ id, name, img }: studentImageProps) {
  const valRef = doc(db, 'students', id)

  const imgSnapshot = img
    ? await uploadBytes(ref(storage, `${`studentImgs/${uniqid()}`}`), img)
    : null

  const imgDownloadUrl = imgSnapshot
    ? await getDownloadURL(imgSnapshot!.ref)
    : null

  if (!img) {
    throw new Error('Nenhuma imagem foi selecionada')
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}

    updateData[name] = imgDownloadUrl

    await updateDoc(valRef, updateData)
  } catch (e) {
    console.log(e)
  }
}
