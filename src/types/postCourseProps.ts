import { imgType } from './imgType'

export interface postCourseProps {
  courseId?: string
  name: string
  courseImg: imgType
  type: string
  professorName: string
  professorImg: imgType
  local: {
    date: string
    startHour: string
    endHour: string
    place: string
  }[]
}
