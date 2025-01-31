import { courses } from "./courses"

export type attendanceSheet = {
  day: Date
  course: courses
  studentsAttendance: studentsAttendance[]

}
