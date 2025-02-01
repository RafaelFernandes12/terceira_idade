import { db, storage } from "@/config/firestore";
import { postCourseProps } from "@/types/courseProps";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createCourse(
  course: postCourseProps,
  semesterId: string,
) {
  if (
    !course.name ||
    !course.type ||
    !course.professorName ||
    !course.local ||
    !course.courseImg ||
    !course.professorImg ||
    !semesterId
  ) {
    throw new Error("Todos os campos devem estar preenchidos");
  }

  const coursesRef = collection(db, "semesters", semesterId, "courses");
  const semesterDoc = await getDoc(doc(db, "semesters", semesterId));
  const querySnapshot = await getDocs(
    query(coursesRef, where("name", "==", course.name)),
  );
  if (!querySnapshot.empty) {
    throw new Error("Curso com o mesmo nome já existe");
  }
  const uploadTasks = [
    course.courseImg
      ? uploadBytes(
        ref(storage, `courseImgs/${course.name}/${uniqid()}`),
        course.courseImg,
      )
      : null,
    course.professorImg
      ? uploadBytes(
        ref(storage, `courseImgs/${course.name}/${uniqid()}`),
        course.professorImg,
      )
      : null,
  ];

  const [courseSnapshot, professorSnapshot] = await Promise.all(uploadTasks);

  const downloadCourseURL = courseSnapshot
    ? await getDownloadURL(courseSnapshot.ref)
    : null;
  const downloadProfessorURL = professorSnapshot
    ? await getDownloadURL(professorSnapshot.ref)
    : null;

  await addDoc(coursesRef, {
    name: course.name,
    courseImg: downloadCourseURL,
    type: course.type,
    professorName: course.professorName,
    professorImg: downloadProfessorURL,
    local: course.local,
    year: semesterDoc.data().year!,
  });
}
