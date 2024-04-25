import { db, storage } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createStudent({
  name, cpf, data_nascimento, responsavel_nome, responsavel_vinculo, telefone_contato, telefone_emergencia, foto, courseId,
  rg_frente,rg_verso,residencia,cardiologista,dermatologista,vacina
}: studentProps) {

  const valRef = collection(db, "students");

  // Upload student photo to storage
  const studentImgs = ref(storage, `${foto === "generic" ? `studentImgs/${uniqid()}.generic` : `studentImgs/${uniqid()}`}`);
  const studentSnapshot = await uploadBytes(studentImgs, foto);
  const downloadstudentURL = await getDownloadURL(studentSnapshot.ref);

  const rg_frenteImgs = ref(storage, `${rg_frente === "generic" ? `rg_frenteImgs/${uniqid()}.generic` : `rg_frenteImgs/${uniqid()}`}`);
  const rg_frenteSnapshot = await uploadBytes(rg_frenteImgs, rg_frente);
  const downloadrg_frenteURL = await getDownloadURL(rg_frenteSnapshot.ref);

  const rg_versoImgs = ref(storage, `${rg_verso === "generic" ? `rg_versoImgs/${uniqid()}.generic` : `rg_versoImgs/${uniqid()}`}`);
  const rg_versoSnapshot = await uploadBytes(rg_versoImgs, rg_verso);
  const downloadRg_versoURL = await getDownloadURL(rg_versoSnapshot.ref);

  const residenciaImgs = ref(storage, `${residencia === "generic" ? `residenciaImgs/${uniqid()}.generic` : `residenciaImgs/${uniqid()}`}`);
  const residenciaSnapshot = await uploadBytes(residenciaImgs, residencia);
  const downloadResidenciaURL = await getDownloadURL(residenciaSnapshot.ref);

  const cardiologistaImgs = ref(storage, `${cardiologista === "generic" ? `cardiologistaImgs/${uniqid()}.generic` : `cardiologistaImgs/${uniqid()}`}`);
  const cardiologistaSnapshot = await uploadBytes(cardiologistaImgs, cardiologista);
  const downloadCardiologistaURL = await getDownloadURL(cardiologistaSnapshot.ref);

  const dermatologistaImgs = ref(storage, `${dermatologista === "generic" ? `dermatologistaImgs/${uniqid()}.generic` : `dermatologistaImgs/${uniqid()}`}`);
  const dermatologistaSnapshot = await uploadBytes(dermatologistaImgs, dermatologista);
  const downloadDermatologistaURL = await getDownloadURL(dermatologistaSnapshot.ref);

  const vacinaImgs = ref(storage, `${vacina === "generic" ? `vacinaImgs/${uniqid()}.generic` : `vacinaImgs/${uniqid()}`}`);
  const vacinaSnapshot = await uploadBytes(vacinaImgs, vacina);
  const downloadVacinaURL = await getDownloadURL(vacinaSnapshot.ref);

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
    rg_frente: downloadrg_frenteURL,
    rg_verso: downloadRg_versoURL,
    residencia: downloadResidenciaURL,
    cardiologista: downloadCardiologistaURL,
    dermatologista: downloadDermatologistaURL,
    vacina: downloadVacinaURL,
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
