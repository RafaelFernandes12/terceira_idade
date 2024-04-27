import { db, storage } from "@/config/firestore";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";

export async function deleteStudent(id: string, ...paths: string[]) {
  await deleteDoc(doc(db, "students", id));

  const coursesRef = collection(db, "courses");
  const studentImgRef = ref(storage, "studentImgs");

  const items = await listAll(studentImgRef);

  const deletePromises = items.items.map(async (item) => {
    const desertRef = ref(storage, `studentImgs/${item.name}`);
    if (paths.some(path => path.includes(item.name))) {
      return deleteObject(desertRef);
    }
  });

  await Promise.all(deletePromises);

  const coursesQuery = query(coursesRef, where("studentId", "array-contains", id));
  const coursesSnapshot = await getDocs(coursesQuery);

  const updatePromises = coursesSnapshot.docs.map(async (courseDoc) => {
    const courseId = courseDoc.id;
    const courseRef = doc(db, "courses", courseId);
    const courseData = courseDoc.data();
    const updatedStudentIds = courseData.studentId.filter((studentId: string) => studentId !== id);
    return updateDoc(courseRef, { studentId: updatedStudentIds });
  });

  await Promise.all(updatePromises);
}
