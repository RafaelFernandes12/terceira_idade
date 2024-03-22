import { db } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { doc, getDoc } from "firebase/firestore";

export async function getStudent(id: string): Promise<studentProps | null> {

  const docRef = doc(db, "students", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data() as { [key: string]: any }; 

  const student: studentProps = {
    name: data.name,
    cpf: data.cpf,
    data_nascimento: data.data_nascimento,
    responsavel_nome: data.responsavel_nome,
    responsavel_vinculo: data.responsavel_vinculo,
    telefone_contato: data.telefone_contato,
    telefone_emergencia: data.telefone_emergencia,
    foto: data.foto,
    rg_frente: data.rg_frente,
    rg_verso: data.rg_verso,
    residencia: data.residencia,
    cardiologista: data.cardiologista,
    dermatologista: data.dermatologista,
  };

  return student;
}
