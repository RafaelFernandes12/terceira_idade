import { db, storage } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createStudent({
  name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia, foto, courseId,
  rg_frente,rg_verso,residencia,cardiologista,dermatologista,vacina
}: studentProps) {

  const valRef = collection(db, "students");
  const studentsRef = collection(db, "students");
  const querySnapshot = await getDocs(query(studentsRef, where("name", "==", name)));
  
  if (!querySnapshot.empty) {
    throw new Error("Estudante com o mesmo nome já existe");
  }
  if (name = "") {
    throw new Error("Estudante tem que possuir um nome");
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

  
  try{
    const docRef = await addDoc(valRef, {
      name: name,
      cpf: cpf,
      data_nascimento: data_nascimento,
      responsavel_nome: responsavel_nome,
      responsavel_vinculo: responsavel_vinculo,
      telefone_contato: telefone_contato,
      telefone_emergencia: telefone_emergencia,
      foto: downloadstudentURL,
      rg_frente: downloadrg_frenteURL,
      rg_verso: downloadRg_versoURL,
      residencia: downloadResidenciaURL,
      cardiologista: downloadCardiologistaURL,
      dermatologista: downloadDermatologistaURL,
      vacina: downloadVacinaURL,
      courseId: courseId
    });

    const studentIds = await Promise.all(courseId!.map(async (course) => {
      const courseRef = doc(db, "courses", course);
      const courseDoc = await getDoc(courseRef);
      const existingStudentIds = courseDoc?.data()?.studentId;
      return { courseId: course, existingStudentIds: existingStudentIds };
    }));
  
    await Promise.all(studentIds.map(async (studentIdObj) => {
      const { courseId, existingStudentIds } = studentIdObj;
      const updatedStudentIds = [...existingStudentIds, docRef.id];
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, { studentId: updatedStudentIds });
    }));
  }catch(e){
    console.log(e);
  }

}
