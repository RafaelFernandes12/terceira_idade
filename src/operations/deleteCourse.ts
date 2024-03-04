import { doc, deleteDoc } from "firebase/firestore";
import {db} from '@/config/firestore'

export async function deleteCourse(id: string){
  
  await deleteDoc(doc(db, "courses", id));

}