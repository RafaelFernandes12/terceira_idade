import { db, storage } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function editStudent({
  studentId,name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia,foto,courseId
}: studentProps) {

  const valRef = doc(db, "students",studentId!);

  const studentImgs = ref(storage,`${foto === "generic"? `studentImgs/${uniqid()}.generic`: `studentImgs/${uniqid()}`}`);
  const studentSnapshot = await uploadBytes(studentImgs, foto);
  const downloadstudentURL = await getDownloadURL(studentSnapshot.ref);

  await updateDoc(valRef, {
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

}
