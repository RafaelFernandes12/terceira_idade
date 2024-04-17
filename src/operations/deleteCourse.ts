import { db } from "@/config/firestore";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export async function deleteCourse(id: string){
  
  await deleteDoc(doc(db, "courses", id));
}