"use server";
import { db, storage } from "@/config/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";

export async function deleteCourse(
  id: string,
  name: string,
  semesterId: string,
) {
  try {
    const courseRef = doc(db, "semesters", semesterId, "courses", id);
    const courseDoc = await getDoc(courseRef);

    if (!courseDoc.exists()) throw new Error("Curso não encontrado");

    const studentsRef = collection(
      db,
      "semesters",
      semesterId,
      "courses",
      id,
      "students",
    );
    const studentsSnapshot = await getDocs(studentsRef);

    if (!studentsSnapshot.empty) {
      throw new Error(
        "Não é possível excluir o curso porque ele tem alunos matriculados.",
      );
    }

    await deleteDoc(courseRef);

    const courseImgRef = ref(storage, `courseImgs/${name}`);
    const courseImgs = (await listAll(courseImgRef)).items.map((img) => {
      const courseImgNameRef = ref(storage, `courseImgs/${name}/${img.name}`);
      return deleteObject(courseImgNameRef);
    });
    await Promise.all(courseImgs);
  } catch (e) {
    console.error("Erro ao excluir o curso:", e);
    throw e;
  }
}
