import { addDoc, collection } from "firebase/firestore"; 
import {db} from '@/config/firestore'

export async function createCourse(name: string){

  
  const courseRef = await addDoc(collection(db, "courses"), {
    name: name,
  });

}