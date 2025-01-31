import { db, storage } from "@/config/firestore";
import { postStudentProps } from "@/types/studentProps";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

async function uploadFile(path: string, file?: File): Promise<string | null> {
  if (!file) return null;
  const fileRef = ref(storage, `${path}/${uniqid()}`);
  const snapshot = await uploadBytes(fileRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function createStudent(props: postStudentProps) {
  try {
    if (!props.name) {
      throw new Error("Estudante tem que possuir um nome");
    }

    const uploadPaths = [
      "foto",
      "rgFrente",
      "rgVerso",
      "residencia",
      "cardiologista",
      "dermatologista",
      "vacina",
    ] as const;

    const uploadPromises = uploadPaths.map((key) =>
      uploadFile(`studentImgs/${props.name}`, props[key]),
    );

    const [
      foto,
      rgFrente,
      rgVerso,
      residencia,
      cardiologista,
      dermatologista,
      vacina,
    ] = await Promise.all(uploadPromises);

    const studentData = {
      ...props,
      foto,
      rgFrente,
      rgVerso,
      residencia,
      cardiologista,
      dermatologista,
      vacina,
    };
    const studentDocRef = collection(db, "students");
    await addDoc(studentDocRef, studentData);
    if (props.courseId) {
      for (const course of props.courseId) {
        const courseRef = doc(
          db,
          "semesters",
          course.year,
          "courses",
          course.id,
        );

        const courseDoc = await getDoc(courseRef);
        if (!courseDoc.exists()) {
          throw new Error(`Course ${course.id} does not exist`);
        }

        const studentsRef = collection(
          db,
          "semesters",
          course.year,
          "courses",
          course.id,
          "students",
        );
        await addDoc(studentsRef, studentData);
      }
    }
  } catch (e) {
    console.error("Error creating student:", e);
    throw e;
  }
}
