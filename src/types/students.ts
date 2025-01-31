import { courses } from './courses'
import { docs } from './docs'
import { personResponsible } from './personResponsible'

export type students = {
  id: number
  name: string
  cpf: string
  birth: string
  phone: string
  img: string
  personResponsible: personResponsible
  docs: docs
  courses: courses[]
}
