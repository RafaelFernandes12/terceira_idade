import { db, storage } from "@/config/firestore";
import { courseProps } from "@/types/courseProps";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createCourse({
  name,
  courseImg,
  type,
  professorName,
  professorImg,
  local
}: courseProps) {

  const coursesRef = collection(db, "courses");
  const querySnapshot = await getDocs(query(coursesRef, where("name", "==", name)));
  if (!querySnapshot.empty) {
    throw new Error("Curso com o mesmo nome já existe");
  }
  if(name === ""){
    throw new Error("Curso precisa de um nome");
  }

  const uploadTasks = [
    uploadBytes(ref(storage, `${courseImg === "generic" ? `courseImgs/${uniqid()}.generic` : `courseImgs/${uniqid()}`}`), courseImg),
    uploadBytes(ref(storage, `${professorImg === "generic" ? `courseImgs/${uniqid()}.generic` : `courseImgs/${uniqid()}`}`), professorImg),
  ];

  const [courseSnapshot, professorSnapshot] = await Promise.all(uploadTasks);

  const downloadCourseURL = await getDownloadURL(courseSnapshot.ref);
  const downloadProfessorURL = await getDownloadURL(professorSnapshot.ref);

  // Add course document to Firestore
  await addDoc(collection(db, "courses"), {
    name: name,
    courseImg: downloadCourseURL,
    type: type,
    professorName: professorName,
    professorImg: downloadProfessorURL,
    local: local,
    studentId: []
  });
}
