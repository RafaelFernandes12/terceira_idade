import { attendanceSheet } from "./attendanceSheet";
import { locals } from "./locals";
import { students } from "./students";
import { teacher } from "./teacher";

export type courses = {
  id: number;
  name: string;
  type: "EXTENSAO" | "ENSINO";
  img: string;
  isAvailable: boolean;
  maxStudents: number;
  maxClasses: number;
  locals: locals[];
  teacher: teacher;
  students: students[];
  sheets: attendanceSheet[];
};
