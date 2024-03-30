import { db } from "@/config/firestore";
import { collection, getDocs } from "firebase/firestore";

export async function getStudents(){
  const querySnapshot = await getDocs(collection(db, "students"));

  const data = querySnapshot.docs.map(response => {
    const id = response.id;
    const data = response.data();
    return {
      id,data
    };
  });

  return data;

}