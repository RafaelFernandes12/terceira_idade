import { db } from "@/config/firestore";
import { collection, getDocs } from "firebase/firestore";

export async function getCourses(){
  const querySnapshot = await getDocs(collection(db, "courses"));

  const data = querySnapshot.docs.map(response => {
    const id = response.id;
    const data = response.data();
    return {
      id,data
    };
  });

  return data;

}