export default interface editCourseProps {
  courseId: string
  name: string
  courseImg: string | undefined | null
  type: string
  professorName: string
  professorImg: string | undefined | null
  local: {
    date: string
    startHour: string
    endHour: string
    place: string
  }[]
}
