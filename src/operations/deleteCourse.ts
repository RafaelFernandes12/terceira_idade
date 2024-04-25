import { db } from "@/config/firestore";
import { deleteDoc, doc, getDocs, query, where, updateDoc, collection } from "firebase/firestore";

export async function deleteCourse(id: string) {
  // Delete course document
  await deleteDoc(doc(db, "courses", id));

  // Find all students referencing the course
  const studentsRef = collection(db,"students");

  const studentsQuery = query(studentsRef, where("courseId", "array-contains", id));
  const studentsSnapshot = await getDocs(studentsQuery);

  // Update each student to remove the course ID from courseId array
  studentsSnapshot.forEach(async (studentDoc) => {
    const studentId = studentDoc.id;
    const studentRef = doc(db, "students", studentId);
    const studentData = studentDoc.data();
    const updatedCourseIds = studentData.courseId.filter((courseId: string) => courseId !== id);
    await updateDoc(studentRef, { courseId: updatedCourseIds });
  });
}
