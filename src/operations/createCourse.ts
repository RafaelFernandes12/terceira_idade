import { db, storage } from "@/config/firestore";
import { courseProps } from "@/types/courseProps";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createCourse({
  courseId,name,courseImg,type,professorName,professorImg,local,studentId
}: courseProps){

  const courseImgs = ref(storage,`${courseImg === "generic"? `coursesImgs/${uniqid()}.generic`: `coursesImgs/${uniqid()}`}`);
  const professorImgs = ref(storage,`${professorImg === "generic"? `professorImgs/${uniqid()}.generic`: `professorImgs/${uniqid()}`}`);

  const valRef = collection(db,"courses");
  
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
    local:local,
  }
  );
}
