import { imgType } from './imgType'
import { localProps } from './localProps'
import { getStudentProps } from './studentProps'

export interface editCourseProps {
  courseId: string
  name: string
  courseImg: string | undefined | null
  type: string
  professorName: string
  professorImg: string | undefined | null
  local: localProps[]
}
export interface getCourseProps {
  courseId?: string
  name: string
  courseImg: string | undefined
  type: string
  professorName: string
  professorImg: string | undefined
  local: localProps[]
  studentId?: string[]
  students?: getStudentProps[]
}

export interface postCourseProps {
  courseId?: string
  name: string
  courseImg: imgType
  type: string
  professorName: string
  professorImg: imgType
  local: localProps[]
  students?: getStudentProps[]
}

export interface getSubCollectionCourseProps {
  courses: {
    courseId?: string
    name: string
    courseImg: imgType
    type: string
    professorName: string
    professorImg: imgType
    local: localProps[]
    students?: getStudentProps[]
  }
}
