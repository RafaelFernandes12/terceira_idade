import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../config/firestore";
import { getCourseProps } from "@/types/courseProps";

export async function getCourses(year?: string): Promise<getCourseProps[]> {
  if (year) {
    // Buscar o documento do semestre
    const semesterDocRef = doc(db, "semesters", year);
    const semesterDocSnap = await getDoc(semesterDocRef);
    const semesterData = semesterDocSnap.exists() ? semesterDocSnap.data() : {};

    // Buscar cursos do semestre específico
    const querySnapshot = await getDocs(collection(semesterDocRef, "courses"));

    return querySnapshot.docs.map((doc) => ({
      courseId: doc.id,
      name: doc.data().name || "",
      courseImg: doc.data().courseImg || undefined,
      type: doc.data().type || "",
      professorName: doc.data().professorName || "",
      professorImg: doc.data().professorImg || undefined,
      local: doc.data().local || [],
      year: semesterData.year || year,
    }));
  }

  const semesterSnapshot = await getDocs(collection(db, "semesters"));
  const semesters = semesterSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const allCourses: getCourseProps[] = [];

  for (const { id: sem, data: semesterData } of semesters) {
    const coursesSnapshot = await getDocs(
      collection(db, "semesters", sem, "courses"),
    );
    const courses = coursesSnapshot.docs.map((doc) => ({
      courseId: doc.id,
      name: doc.data().name || "",
      courseImg: doc.data().courseImg || undefined,
      type: doc.data().type || "",
      professorName: doc.data().professorName || "",
      professorImg: doc.data().professorImg || undefined,
      local: doc.data().local || [],
      year: semesterData.year || sem,
    }));

    allCourses.push(...courses);
  }

  return allCourses;
}
