import { db } from "@/config/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStudentProps } from "@/types/studentProps";

export async function getSubcollectionOfCourse(
  semesterId: string,
  courseId: string,
): Promise<getStudentProps[]> {
  const docRef = collection(
    db,
    "semesters",
    semesterId,
    "courses",
    courseId,
    "students",
  );
  const docsSnap = await getDocs(docRef);

  const studentsFromCourseData: getStudentProps[] = docsSnap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name ?? "",
      cpf: data.cpf ?? "",
      dataNascimento: data.dataNascimento ?? "",
      responsavelNome: data.responsavelNome ?? "",
      responsavelVinculo: data.responsavelVinculo ?? "",
      telefoneContato: data.telefoneContato ?? "",
      telefoneEmergencia: data.telefoneEmergencia ?? "",
      foto: data.foto ?? undefined,
      vacina: data.vacina ?? undefined,
      rgFrente: data.rgFrente ?? undefined,
      rgVerso: data.rgVerso ?? undefined,
      residencia: data.residencia ?? undefined,
      cardiologista: data.cardiologista ?? undefined,
      dermatologista: data.dermatologista ?? undefined,
      courseId: data.courseId ?? [],
      courses: data.courses ?? [],
      year: data.year ?? "",
    };
  });

  return studentsFromCourseData;
}
