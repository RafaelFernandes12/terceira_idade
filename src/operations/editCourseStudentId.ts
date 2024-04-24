import { db, storage } from "@/config/firestore";
import { courseProps } from "@/types/courseProps";
import { doc, updateDoc } from "firebase/firestore";
export async function editCourseStudentId({courseId}: courseProps){

  const courseRef = doc(db, "courses", courseId!);
    
  await updateDoc(courseRef, { 
    studentId: courseRef.id, 
  }
  );
}