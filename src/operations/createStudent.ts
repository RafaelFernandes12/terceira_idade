import { db, storage } from "@/config/firestore";
import { postStudentProps } from "@/types/studentProps";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";

export async function createStudent(props: postStudentProps) {
  try {
    // Validate required fields
    if (!props.name) {
      throw new Error("Estudante tem que possuir um nome");
    }

    // Upload all images to Firebase Storage
    const uploadTasks = [
      props.foto
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.foto,
          )
        : null,
      props.rgFrente
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.rgFrente,
          )
        : null,
      props.rgVerso
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.rgVerso,
          )
        : null,
      props.residencia
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.residencia,
          )
        : null,
      props.cardiologista
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.cardiologista,
          )
        : null,
      props.dermatologista
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.dermatologista,
          )
        : null,
      props.vacina
        ? uploadBytes(
            ref(storage, `studentImgs/${props.name}/${uniqid()}`),
            props.vacina,
          )
        : null,
    ];

    const [
      fotoSnapshot,
      rgFrenteSnapshot,
      rgVersoSnapshot,
      residenciaSnapshot,
      cardiologistaSnapshot,
      dermatologistaSnapshot,
      vacinaSnapshot,
    ] = await Promise.all(uploadTasks);

    // Get download URLs for the uploaded images
    const [
      downloadFotoURL,
      downloadRgFrenteURL,
      downloadRgVersoURL,
      downloadResidenciaURL,
      downloadCardiologistaURL,
      downloadDermatologistaURL,
      downloadVacinaURL,
    ] = await Promise.all([
      fotoSnapshot ? getDownloadURL(fotoSnapshot.ref) : null,
      rgFrenteSnapshot ? getDownloadURL(rgFrenteSnapshot.ref) : null,
      rgVersoSnapshot ? getDownloadURL(rgVersoSnapshot.ref) : null,
      residenciaSnapshot ? getDownloadURL(residenciaSnapshot.ref) : null,
      cardiologistaSnapshot ? getDownloadURL(cardiologistaSnapshot.ref) : null,
      dermatologistaSnapshot
        ? getDownloadURL(dermatologistaSnapshot.ref)
        : null,
      vacinaSnapshot ? getDownloadURL(vacinaSnapshot.ref) : null,
    ]);

    // Create the student data object
    const studentData = {
      ...props,
      foto: downloadFotoURL,
      rgFrente: downloadRgFrenteURL,
      rgVerso: downloadRgVersoURL,
      residencia: downloadResidenciaURL,
      cardiologista: downloadCardiologistaURL,
      dermatologista: downloadDermatologistaURL,
      vacina: downloadVacinaURL,
    };

    // Loop through the courseId array and add the student to each course's students subcollection
    if (props.courseId) {
      for (const course of props.courseId) {
        const courseRef = doc(
          db,
          "semesters",
          course.year,
          "courses",
          course.id,
        );

        // Check if the course exists
        const courseDoc = await getDoc(courseRef);
        if (!courseDoc.exists()) {
          throw new Error(`Course ${course.id} does not exist`);
        }

        // Add the student to the course's students subcollection
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
    throw e; // Re-throw the error for handling in the calling function
  }
}
