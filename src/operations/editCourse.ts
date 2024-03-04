import { doc, updateDoc } from "firebase/firestore";
import {db} from '@/config/firestore'

export async function editCourse(id: string, newName: string){

    const courseRef = doc(db, "courses", id);

    await updateDoc(courseRef, {
      name: newName
    });
}