import { db } from "@/config/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface UpdatedCoursesStudentIdProps {
    studentId: string;
    courseIds: string[];
}

export async function updatedCoursesStudentId({ studentId, courseIds }: UpdatedCoursesStudentIdProps) {
  try {
    // Fetch the document for the student
    const studentRef = doc(db, "students", studentId);
    const studentDoc = await getDoc(studentRef);
    const existingCourseIds = studentDoc?.data()?.courseId || []; // Ensure to handle if courseId is null

    // Filter out existing course IDs from the array of new course IDs
    const uniqueCourseIds = courseIds.filter(courseId => !existingCourseIds.includes(courseId));

    // Concatenate existing and new courseIds to update the courseId array
    const updatedCourseIds = [...existingCourseIds, ...uniqueCourseIds];

    // Update the courseId array in the student document
    await updateDoc(studentRef, { courseId: updatedCourseIds });

    console.log("Course IDs added to the student successfully");
  } catch (error) {
    console.error("Error adding course IDs to the student:", error);
    throw error; // Throw the error for handling in the caller function
  }
}
