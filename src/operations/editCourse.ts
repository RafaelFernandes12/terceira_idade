import { db, storage } from "@/config/firestore";
import { postCourseProps } from "@/types/courseProps";
import {
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function editCourse(
  course: postCourseProps,
  semesterId: string,
  year: string,
  courseId: string,
) {
  const currentCourseRef = doc(db, "semesters", year, "courses", courseId);

  const courseDoc = await getDoc(currentCourseRef);
  if (!courseDoc.exists()) {
    throw new Error("Curso não encontrado");
  }

  const querySnapshot = await getDocs(
    query(
      collection(db, "semesters", year, "courses"),
      where("name", "==", course.name),
    ),
  );

  const isDuplicateName = querySnapshot.docs.some(
    (doc) => doc.id !== courseId && doc.data().name === course.name,
  );

  if (isDuplicateName) {
    throw new Error("Curso com o mesmo nome já existe");
  }

  if (!course.name) {
    throw new Error("Todos os campos devem ser preenchidos");
  }

  let downloadCourseURL = courseDoc.data().courseImg;
  if (course.courseImg) {
    const courseSnapshot = await uploadBytes(
      ref(storage, `courseImgs/${course.name}/${uniqid()}`),
      course.courseImg,
    );
    downloadCourseURL = await getDownloadURL(courseSnapshot.ref);
  }

  let downloadProfessorURL = courseDoc.data().professorImg;
  if (course.professorImg) {
    const professorSnapshot = await uploadBytes(
      ref(storage, `courseImgs/${course.name}/${uniqid()}`),
      course.professorImg,
    );
    downloadProfessorURL = await getDownloadURL(professorSnapshot.ref);
  }

  const updatedCourseData = {
    name: course.name,
    courseImg: downloadCourseURL,
    type: course.type,
    professorName: course.professorName,
    professorImg: downloadProfessorURL,
    local: course.local,
    year: semesterId,
  };

  if (semesterId !== year) {
    const newCourseRef = doc(db, "semesters", semesterId, "courses", courseId);

    await setDoc(newCourseRef, updatedCourseData);

    await deleteDoc(currentCourseRef);
  } else {
    await updateDoc(currentCourseRef, updatedCourseData);
  }
}
