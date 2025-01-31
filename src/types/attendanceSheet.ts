import { courses } from './courses'
import { studentsAttendance } from './studentsAttendance'

export type attendanceSheet = {
  day: Date
  course: courses
  studentsAttendance: studentsAttendance[]
}
