export default interface getCourseProps {
  courseId?: string
  name: string
  courseImg: string | undefined
  type: string
  professorName: string
  professorImg: string | undefined
  local: {
    date: string
    startHour: string
    endHour: string
    place: string
  }[]
  studentId?: string[]
}
