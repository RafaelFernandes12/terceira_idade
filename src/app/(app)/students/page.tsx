import { getStudents } from "@/operations/getStudents";
import { ViewStudents } from "./components/ViewStudents";


export default async function Students() {

  const students = await getStudents();
  
  return (
    <ViewStudents data={students}/>
  );
}
