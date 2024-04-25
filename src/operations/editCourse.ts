import { db, storage } from "@/config/firestore";
import { courseProps } from "@/types/courseProps";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function editCourse({ courseId, name, courseImg, type, professorName, professorImg, local, studentId }: courseProps) {

  const courseRef = doc(db, "courses", courseId!);
  const courseImgs = ref(storage, `courseImgs/${uniqid()}`);
  const professorImgs = ref(storage, `professorImgs/${uniqid()}`);

  // Upload course image if provided
  let downloadCourseURL = "";
  if (courseImg) {
    const courseSnapshot = await uploadBytes(courseImgs, courseImg);
    downloadCourseURL = await getDownloadURL(courseSnapshot.ref);
  }

  // Upload professor image if provided
  let downloadProfessorURL = "";
  if (professorImg) {
    const professorSnapshot = await uploadBytes(professorImgs, professorImg);
    downloadProfessorURL = await getDownloadURL(professorSnapshot.ref);
  }

  // Define fields to update based on provided values
  const updateFields: Partial<courseProps> = {};
  if (name) updateFields.name = name;
  if (downloadCourseURL) updateFields.courseImg = downloadCourseURL;
  if (type) updateFields.type = type;
  if (professorName) updateFields.professorName = professorName;
  if (downloadProfessorURL) updateFields.professorImg = downloadProfessorURL;
  if (local) updateFields.local = local;
  if (studentId) updateFields.studentId = studentId;

  // Update course document
  await updateDoc(courseRef, updateFields);
}
