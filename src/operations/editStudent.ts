import { db, storage } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import uniqid from "uniqid";

export async function editStudent({
  studentId,name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia, foto, courseId,
  rg_frente,rg_verso,residencia,cardiologista,dermatologista,vacina
}: studentProps) {

  const valRef = doc(db, "students",studentId!);
  const studentsRef = collection(db, "students");
  const querySnapshot = await getDocs(query(studentsRef, where("name", "==", name)));
  
  if (!querySnapshot.empty) {
    throw new Error("Estudante com o mesmo nome já existe");
  }

  const uploadTasks = [
    uploadBytes(ref(storage, `${foto === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), foto),
    uploadBytes(ref(storage, `${rg_frente === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), rg_frente),
    uploadBytes(ref(storage, `${rg_verso === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), rg_verso),
    uploadBytes(ref(storage, `${residencia === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), residencia),
    uploadBytes(ref(storage, `${cardiologista === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), cardiologista),
    uploadBytes(ref(storage, `${dermatologista === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), dermatologista),
    uploadBytes(ref(storage, `${vacina === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`), vacina)
  ];

  const [fotoSnapshot, rg_frenteSnapshot, rg_versoSnapshot, residenciaSnapshot, cardiologistaSnapshot, 
    dermatologistaSnapshot, vacinaSnapshot] = await Promise.all(uploadTasks);

  const [downloadstudentURL, downloadrg_frenteURL, downloadRg_versoURL, downloadResidenciaURL, 
    downloadCardiologistaURL, downloadDermatologistaURL, downloadVacinaURL] = await Promise.all([
    getDownloadURL(fotoSnapshot.ref),
    getDownloadURL(rg_frenteSnapshot.ref),
    getDownloadURL(rg_versoSnapshot.ref),
    getDownloadURL(residenciaSnapshot.ref),
    getDownloadURL(cardiologistaSnapshot.ref),
    getDownloadURL(dermatologistaSnapshot.ref),
    getDownloadURL(vacinaSnapshot.ref)
  ]);

  const updateFields: Partial<studentProps> = {};
  if (name) updateFields.name = name;
  if (cpf) updateFields.cpf = cpf;
  if (data_nascimento) updateFields.data_nascimento = data_nascimento;
  if (responsavel_nome) updateFields.responsavel_nome = responsavel_nome;
  if (responsavel_vinculo) updateFields.responsavel_vinculo = responsavel_vinculo;
  if (telefone_contato) updateFields.telefone_contato = telefone_contato;
  if (telefone_emergencia) updateFields.telefone_emergencia = telefone_emergencia;
  if (foto != "generic") updateFields.foto = downloadstudentURL;
  if (rg_frente != "generic") updateFields.rg_frente = downloadrg_frenteURL;
  if (rg_verso != "generic") updateFields.rg_verso = downloadRg_versoURL;
  if (residencia != "generic") updateFields.residencia = downloadResidenciaURL;
  if (cardiologista != "generic") updateFields.cardiologista = downloadCardiologistaURL;
  if (dermatologista != "generic") updateFields.dermatologista = downloadDermatologistaURL;
  if (vacina != "generic") updateFields.vacina = downloadVacinaURL;


  
  try {
    await updateDoc(valRef, updateFields);
    
    const studentIds = await Promise.all(courseId!.map(async (course) => {
      const courseRef = doc(db, "courses", course);
      const courseDoc = await getDoc(courseRef);
      const existingStudentIds = courseDoc.data()!.studentId;
      return { courseId: course, existingStudentIds: existingStudentIds };
    }));
  
    await Promise.all(studentIds.map(async (studentIdObj) => {
      const { courseId, existingStudentIds } = studentIdObj;
      const updatedStudentIds = [...existingStudentIds, studentId];
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, { studentId: updatedStudentIds });
    }));
  }catch(e){
    console.log(e);
  }
}
