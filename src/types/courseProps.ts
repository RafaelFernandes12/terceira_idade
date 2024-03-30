export interface courseProps {
  id?: string,
  name?: string,
  courseImg?: any,
  type?: string,
  professorName: string,
  professorImg: any,
  local: {
    date: string,
    startHour: string,
    endHour: string,
    place: string,
  }[]
}

