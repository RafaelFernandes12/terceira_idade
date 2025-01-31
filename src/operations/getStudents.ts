import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firestore";
import { getStudentProps } from "@/types/studentProps";

export async function getStudents(
  currentYear: string | null,
): Promise<getStudentProps[]> {
  const studentsSnapshot = await getDocs(collection(db, "students"));
  const students: getStudentProps[] = [];

  studentsSnapshot.docs.forEach((studentDoc) => {
    const studentData = studentDoc.data();

    if (
      !currentYear ||
      (studentData.courseId &&
        studentData.courseId.some((course: any) => course.year === currentYear))
    ) {
      students.push({
        id: studentDoc.id,
        name: studentData.name || "",
        cpf: studentData.cpf || "",
        dataNascimento: studentData.dataNascimento || "",
        responsavelNome: studentData.responsavelNome || "",
        responsavelVinculo: studentData.responsavelVinculo || "",
        telefoneContato: studentData.telefoneContato || "",
        telefoneEmergencia: studentData.telefoneEmergencia || "",
        foto: studentData.foto || undefined,
        rgFrente: studentData.rgFrente || undefined,
        rgVerso: studentData.rgVerso || undefined,
        residencia: studentData.residencia || undefined,
        cardiologista: studentData.cardiologista || undefined,
        dermatologista: studentData.dermatologista || undefined,
        vacina: studentData.vacina || undefined,
        courseId: studentData.courseId || [],
      });
    }
  });

  return students;
}
