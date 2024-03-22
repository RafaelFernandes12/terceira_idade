import profile from "@/assets/profile.svg";
import { db, storage } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createStudent({
  name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia
}: studentProps) {

  const valRef = collection(db, "students");

  const studentImgs = ref(storage,`studentImgs/${uniqid()}`);
  const studentSnapshot = await uploadBytes(studentImgs, profile);
  const downloadstudentURL = await getDownloadURL(studentSnapshot.ref);

  await addDoc(valRef, {
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
    dermatologista: ""
  }
  );
}
