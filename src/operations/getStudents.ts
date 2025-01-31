import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firestore"; // Adjust the path as needed
import { getStudentProps } from "@/types/studentProps"; // Import the interface

export async function getStudents(
  semesterId?: string,
): Promise<getStudentProps[]> {
  if (semesterId) {
    const coursesSnapshot = await getDocs(
      collection(db, "semesters", semesterId, "courses"),
    );

    const students: getStudentProps[] = [];

    // Loop through each course in the semester
    for (const courseDoc of coursesSnapshot.docs) {
      const courseId = courseDoc.id;

      // Fetch all students in the course
      const studentsSnapshot = await getDocs(
        collection(
          db,
          "semesters",
          semesterId,
          "courses",
          courseId,
          "students",
        ),
      );

      // Map students to the getStudentProps interface
      studentsSnapshot.docs.forEach((studentDoc) => {
        students.push({
          id: studentDoc.id,
          name: studentDoc.data().name || "",
          cpf: studentDoc.data().cpf || "",
          dataNascimento: studentDoc.data().dataNascimento || "",
          responsavelNome: studentDoc.data().responsavelNome || "",
          responsavelVinculo: studentDoc.data().responsavelVinculo || "",
          telefoneContato: studentDoc.data().telefoneContato || "",
          telefoneEmergencia: studentDoc.data().telefoneEmergencia || "",
          foto: studentDoc.data().foto || undefined,
          rgFrente: studentDoc.data().rgFrente || undefined,
          rgVerso: studentDoc.data().rgVerso || undefined,
          residencia: studentDoc.data().residencia || undefined,
          cardiologista: studentDoc.data().cardiologista || undefined,
          dermatologista: studentDoc.data().dermatologista || undefined,
          vacina: studentDoc.data().vacina || undefined,
          courseId,
          year: semesterId, // Add the semester ID
        });
      });
    }

    return students;
  }

  // If no semesterId is provided, fetch all students from all semesters
  const semestersSnapshot = await getDocs(collection(db, "semesters"));
  const semesters = semestersSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const allStudents: getStudentProps[] = [];

  // Loop through each semester
  for (const { id: currentSemesterId } of semesters) {
    // Fetch all courses in the semester
    const coursesSnapshot = await getDocs(
      collection(db, "semesters", currentSemesterId, "courses"),
    );

    // Loop through each course
    for (const courseDoc of coursesSnapshot.docs) {
      const currentCourseId = courseDoc.id;

      // Fetch all students in the course
      const studentsSnapshot = await getDocs(
        collection(
          db,
          "semesters",
          currentSemesterId,
          "courses",
          currentCourseId,
          "students",
        ),
      );

      // Map students to the getStudentProps interface
      studentsSnapshot.docs.forEach((studentDoc) => {
        allStudents.push({
          id: studentDoc.id,
          name: studentDoc.data().name || "",
          cpf: studentDoc.data().cpf || "",
          dataNascimento: studentDoc.data().dataNascimento || "",
          responsavelNome: studentDoc.data().responsavelNome || "",
          responsavelVinculo: studentDoc.data().responsavelVinculo || "",
          telefoneContato: studentDoc.data().telefoneContato || "",
          telefoneEmergencia: studentDoc.data().telefoneEmergencia || "",
          foto: studentDoc.data().foto || undefined,
          rgFrente: studentDoc.data().rgFrente || undefined,
          rgVerso: studentDoc.data().rgVerso || undefined,
          residencia: studentDoc.data().residencia || undefined,
          cardiologista: studentDoc.data().cardiologista || undefined,
          dermatologista: studentDoc.data().dermatologista || undefined,
          vacina: studentDoc.data().vacina || undefined,
          // courseId: currentCourseId, // Add the course ID
          year: currentSemesterId, // Add the semester ID
        });
      });
    }
  }

  return allStudents;
}
