import { studentProps } from "./studentProps";

export interface courseProps {
  courseId?: string,
  name?: string,
  courseImg?: any,
  type?: string,
  professorName?: string,
  professorImg?: any,
  local?: {
    date: string,
    startHour: string,
    endHour: string,
    place: string,
  }[],
  studentId?: string,
  students?: studentProps[]
}

