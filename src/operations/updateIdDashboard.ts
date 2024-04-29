import { db } from "@/config/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface UpdatedStudentsCourseIdProps {
    courseId: string;
    studentId: string;
}

export async function updateIdDashboard({ courseId,studentId }: UpdatedStudentsCourseIdProps) {
  try {
    const courseRef = doc(db, "students", studentId);
    const courseDoc = await getDoc(courseRef);
    const existingStudentIds = courseDoc?.data()?.courseId || []; 

    const updatedStudentIds = [...existingStudentIds ,courseId];

    await updateDoc(courseRef, { courseId: updatedStudentIds });

    console.log("Student IDs added to the course successfully");
  } catch (error) {
    console.error("Error adding student IDs to the course:", error);
    throw error;
  }
}
