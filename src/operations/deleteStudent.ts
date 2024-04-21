import { db, storage } from "@/config/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";




export async function deleteStudent(id: string){
  
  //const storageRef = ref(storage, `studentImgs/${name}`);

  await deleteDoc(doc(db, "students", id));
  //await deleteObject(storageRef);
}