import { db } from "@/config/firestore";
import { studentProps } from "@/types/studentProps";
import { doc, updateDoc } from "firebase/firestore";

export async function editStudentCourseId({studentId}: studentProps){

  const courseRef = doc(db, "students", studentId!);
    
  await updateDoc(courseRef, { 
    courseId: courseRef.id, 
  }
  );
}