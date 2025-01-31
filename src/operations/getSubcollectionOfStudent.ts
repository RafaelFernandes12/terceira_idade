import { db } from "@/config/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getCourseProps } from "@/types/courseProps";

export async function getSubcollectionOfStudent(
  semesterId: string,
  courseIds: string[],
): Promise<getCourseProps[]> {
  if (!courseIds) return [];
  const coursePromises = courseIds.map(async (courseId) => {
    const docRef = doc(db, "semesters", semesterId, "courses", courseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();

    return {
      courseId: docSnap.id,
      name: data.name || "",
      courseImg: data.courseImg || undefined,
      type: data.type || "",
      professorName: data.professorName || "",
      professorImg: data.professorImg || undefined,
      local: data.local || [],
      studentId: data.studentId || [],
      students: data.students || [],
      year: data.year || "",
    } as getCourseProps;
  });

  const coursesFromStudentData = (await Promise.all(coursePromises)).filter(
    (course): course is getCourseProps => course !== null,
  );

  return coursesFromStudentData;
}
