import { db } from "@/config/firestore";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteCourse(id: string){
  
  await deleteDoc(doc(db, "courses", id));

}