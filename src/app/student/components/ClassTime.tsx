import { daysOfWeek, hoursOfClass } from '@/data'
import { getSubcollectionOfCourseFromStudents } from '@/operations/getSubcollectionOfCourseFromStudents'
import { localProps } from '@/types/localProps'
import { DocumentData } from 'firebase/firestore'
import React from 'react'

interface classTimeProps {
  id: string
}

export async function ClassTime({ id }: classTimeProps) {
  const subCourse = await getSubcollectionOfCourseFromStudents(id)

  const getInfo = (day: string, hour: string) => {
    const entries = subCourse.flatMap((response: DocumentData) =>
      response.data.courses.local.flatMap((item: localProps) => {
        if (item.date === day && item.hour === hour) {
          return response.data.courses.name
        }
        return []
      }),
    )
    return entries
  }

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <table className="border-2 border-black w-11/12 m-auto my-5 text-center">
        <thead>
          <tr className="border-2 border-black">
            <th className="border-2 border-black"></th>
            {daysOfWeek.map((day) => (
              <th key={day} className="border-2 border-black">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursOfClass.map((hour, index) => (
            <React.Fragment key={hour}>
              {index === 0 && (
                <tr className="bg-slate-400">
                  <td className="text-center">Matutino</td>
                  <td
                    colSpan={daysOfWeek.length + 1}
                    className="bg-slate-400"
                  ></td>
                </tr>
              )}
              {index === hoursOfClass.indexOf('13:00 - 14:00') && (
                <tr className="bg-slate-400">
                  <td className="text-center">Vespertino</td>
                  <td
                    colSpan={daysOfWeek.length + 1}
                    className="bg-slate-400"
                  ></td>
                </tr>
              )}
              {index === hoursOfClass.indexOf('18:00 - 19:00') && (
                <tr className="bg-slate-400">
                  <td className="text-center">Noturno</td>
                  <td
                    colSpan={daysOfWeek.length + 1}
                    className="bg-slate-400"
                  ></td>
                </tr>
              )}
              <tr className="border-2 border-black">
                <td className="border-2 border-black">{hour}</td>
                {daysOfWeek.map((day) => (
                  <td key={day} className="border-2 border-black">
                    {getInfo(day, hour)}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
