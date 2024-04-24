import { db, storage } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createStudent({
  name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia, foto, courseId
}: studentProps) {

  const valRef = collection(db, "students");

  // Upload student photo to storage
  const studentImgs = ref(storage, `${foto === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`);
  const studentSnapshot = await uploadBytes(studentImgs, foto);
  const downloadstudentURL = await getDownloadURL(studentSnapshot.ref);

  // Add new student to students collection
  const docRef = await addDoc(valRef, {
    name: name,
    cpf: cpf,
    data_nascimento: data_nascimento,
    responsavel_nome: responsavel_nome,
    responsavel_vinculo: responsavel_vinculo,
    telefone_contato: telefone_contato,
    telefone_emergencia: telefone_emergencia,
    foto: downloadstudentURL,
    rg_frente: "",
    rg_verso: "",
    residencia: "",
    cardiologista: "",
    dermatologista: "",
    courseId: courseId
  });

  const studentIds = courseId!.map(async (course) => {
    const courseRef = doc(db, "courses", course);
    const courseDoc = await getDoc(courseRef);
    const existingStudentIds = courseDoc?.data()?.studentId;
    return { courseId: course, existingStudentIds: existingStudentIds };
  });

  studentIds.forEach(async (studentIdObj) => {
    const { courseId, existingStudentIds } = await studentIdObj;
    const updatedStudentIds = [...existingStudentIds, docRef.id];
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, { studentId: updatedStudentIds });
  });
}
