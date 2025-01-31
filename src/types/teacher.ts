import { courses } from "./courses"

export type teacher = {
  id: number
  name: string
  img: string
  courses: courses[]
}
