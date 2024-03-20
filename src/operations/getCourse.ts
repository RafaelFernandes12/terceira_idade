import {db} from '@/config/firestore'
import { doc, getDoc } from "firebase/firestore";

export async function getCourse(id: string){

    const docRef = doc(db, "courses", id);
    const docSnap = (await getDoc(docRef)).data()

    return docSnap!

}