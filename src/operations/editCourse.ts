import { db, storage } from "@/config/firestore";
import { courseProps } from "@/types/courseProps";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function editCourse({ courseId, name, courseImg, type, professorName, professorImg, local }: courseProps) {

  const courseRef = doc(db, "courses", courseId!);
  const courseImgs = ref(storage, `courseImgs/${uniqid()}`);
  const professorImgs = ref(storage, `professorImgs/${uniqid()}`);

  const coursesRef = collection(db, "courses");
  const querySnapshot = await getDocs(query(coursesRef, where("name", "==", name)));
  if (!querySnapshot.empty) {
    throw new Error("Curso com o mesmo nome já existe");
  }
  if(name === ""){
    throw new Error("Curso precisa de um nome");
  }
  const courseSnapshot = await uploadBytes(courseImgs, courseImg);
  const downloadCourseURL = await getDownloadURL(courseSnapshot.ref);

  const professorSnapshot = await uploadBytes(professorImgs, professorImg);
  const downloadProfessorURL = await getDownloadURL(professorSnapshot.ref);

  const updateFields: Partial<courseProps> = {};
  if (name) updateFields.name = name;
  if (courseImg != "generic") updateFields.courseImg = downloadCourseURL;
  if (type) updateFields.type = type;
  if (professorName) updateFields.professorName = professorName;
  if (professorImg != "generic") updateFields.professorImg = downloadProfessorURL;
  if (local) updateFields.local = local;

  await updateDoc(courseRef, updateFields);
}
