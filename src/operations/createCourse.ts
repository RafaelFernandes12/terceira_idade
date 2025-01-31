import { db, storage } from "@/config/firestore";
import { postCourseProps } from "@/types/courseProps";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createCourse(
  course: postCourseProps,
  semesterId: string,
) {
  // Reference to the courses subcollection in the semester document
  const coursesRef = collection(db, "semesters", semesterId, "courses");

  // Check if a course with the same name already exists in the semester
  const querySnapshot = await getDocs(
    query(coursesRef, where("name", "==", course.name)),
  );
  if (!querySnapshot.empty) {
    throw new Error("Curso com o mesmo nome já existe");
  }
  if (course.name === "") {
    throw new Error("Curso precisa de um nome");
  }

  // Upload images to Firebase Storage
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

  // Get download URLs for the uploaded images
  const downloadCourseURL = courseSnapshot
    ? await getDownloadURL(courseSnapshot.ref)
    : null;
  const downloadProfessorURL = professorSnapshot
    ? await getDownloadURL(professorSnapshot.ref)
    : null;

  // Add the course to the semester's courses subcollection
  await addDoc(coursesRef, {
    name: course.name,
    courseImg: downloadCourseURL,
    type: course.type,
    professorName: course.professorName,
    professorImg: downloadProfessorURL,
    local: course.local,
  });
}
