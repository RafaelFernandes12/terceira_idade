import { db } from "@/config/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface UpdatedStudentsCourseIdProps {
    courseId: string;
    studentIds: string[];
}

export async function updatedStudentsCourseId({ courseId, studentIds }: UpdatedStudentsCourseIdProps) {
  try {
    // Fetch the document for the course
    const courseRef = doc(db, "courses", courseId);
    const courseDoc = await getDoc(courseRef);
    const existingStudentIds = courseDoc?.data()?.studentId || []; // Ensure to handle if studentId is null

    // Filter out existing student IDs from the array of new student IDs
    const uniqueStudentIds = studentIds.filter(studentId => !existingStudentIds.includes(studentId));

    // Concatenate existing and new studentIds to update the studentId array
    const updatedStudentIds = [...existingStudentIds, ...uniqueStudentIds];

    // Update the studentId array in the course document
    await updateDoc(courseRef, { studentId: updatedStudentIds });

    console.log("Student IDs added to the course successfully");
  } catch (error) {
    console.error("Error adding student IDs to the course:", error);
    throw error; // Throw the error for handling in the caller function
  }
}
