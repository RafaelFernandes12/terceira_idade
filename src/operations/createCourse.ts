import { addDoc, collection } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/config/firestore';
import uniqid from 'uniqid';
import { courseProps } from "@/types/courseProps";

export async function createCourse({
  name,courseImg,type,professorName,professorImg,local
}: courseProps){

  const courseImgs = ref(storage,`courseImgs/${uniqid()}`)
  const professorImgs = ref(storage,`professorImgs/${uniqid()}`)
  const valRef = collection(db,'courses')
  
  const courseSnapshot = await uploadBytes(courseImgs, courseImg);
  const downloadCourseURL = await getDownloadURL(courseSnapshot.ref);

  const professorSnapshot = await uploadBytes(professorImgs, professorImg);
  const downloadProfessorURL = await getDownloadURL(professorSnapshot.ref);

  await addDoc(valRef, { 
    name: name, 
    imgUrl: downloadCourseURL, 
    type: type,
    professorName:professorName,
    professorImg:downloadProfessorURL,
    local:local 
  }
  );
}
