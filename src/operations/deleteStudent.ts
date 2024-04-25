import { db } from "@/config/firestore";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export async function deleteStudent(id: string) {
  // Delete student document
  await deleteDoc(doc(db, "students", id));

  // Find all courses that reference the student
  const coursesRef = collection(db,"courses");


  const coursesQuery = query(coursesRef, where("studentId", "array-contains", id));
  const coursesSnapshot = await getDocs(coursesQuery);

  // Update each course to remove the student's ID from studentId array
  coursesSnapshot.forEach(async (courseDoc) => {
    const courseId = courseDoc.id;
    const courseRef = doc(db, "courses", courseId);
    const courseData = courseDoc.data();
    const updatedStudentIds = courseData.studentId.filter((studentId: string) => studentId !== id);
    await updateDoc(courseRef, { studentId: updatedStudentIds });
  });
}
