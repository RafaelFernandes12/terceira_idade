import { db } from "@/config/firestore";
import { semesterProps } from "@/types/semester";
import { collection, getDocs } from "firebase/firestore";

export async function getAllSemesters() {
  const querySnapshot = await getDocs(collection(db, "semesters"));

  const data = querySnapshot.docs.map((response) => {
    const data = response.data() as semesterProps;
    const { year, start, end } = data;
    return {
      year,
      start,
      end,
    };
  });

  return data;
}
