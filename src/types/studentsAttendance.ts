import { attendanceSheet } from './attendanceSheet'
import { students } from './students'

export type studentsAttendance = {
  id: number
  student: students
  attendance: number
  attendanceSheet: attendanceSheet
}
