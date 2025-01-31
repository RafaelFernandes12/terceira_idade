import { db } from "@/config/firestore";
import { getStudentProps } from "@/types/studentProps";
import { doc, getDoc } from "firebase/firestore";

export async function getStudent(
  id: string,
  course: { semesterId: string; courseId: string },
): Promise<getStudentProps> {
  // Reference to the student document
  const docRef = doc(
    db,
    "semesters",
    course.semesterId,
    "courses",
    course.courseId,
    "students",
    id,
  );

  // Fetch the student document
  const docSnap = await getDoc(docRef);

  // Check if the document exists
  if (!docSnap.exists()) {
    throw new Error("Student not found");
  }

  // Extract the student data
  const data = docSnap.data() as getStudentProps;

  // Return the student object
  return {
    id: docSnap.id, // Include the student ID in the returned object
    name: data.name,
    cpf: data.cpf,
    dataNascimento: data.dataNascimento,
    responsavelNome: data.responsavelNome,
    responsavelVinculo: data.responsavelVinculo,
    telefoneContato: data.telefoneContato,
    telefoneEmergencia: data.telefoneEmergencia,
    foto: data.foto,
    rgFrente: data.rgFrente,
    rgVerso: data.rgVerso,
    residencia: data.residencia,
    cardiologista: data.cardiologista,
    dermatologista: data.dermatologista,
    vacina: data.vacina,
    courseId: data.courseId,
    courses: data.courses,
    year: data.year,
  };
}
