'use client'

import { useState } from 'react'

interface ContainerContent {
  name: string
  children: React.ReactNode
}

export default function ContainerContent({ name, children }: ContainerContent) {
  const [courseType, setCourseType] = useState('DadosGerais')

  function handleCourseType(filterCourse: string) {
    setCourseType(filterCourse)
  }

  return (
    <div className="border-2 border-black rounded-lg p-4 ">
      <div className="border-b-2 border-black w-full font-medium my-4 text-4xl max-md:text-2xl">
        {name}
      </div>
      <div>
        {courseType === 'DadosGerais' ? (
          <>
            <ul className="inline-flex gap-3 mb-4">
              <button onClick={() => handleCourseType('DadosGerais')}>
                <li className="font-regular text-lg border-b-2 border-[#161250] max-sm:text-xs">
                  Dados gerais
                </li>
              </button>
              <button onClick={() => handleCourseType('Participantes')}>
                <li className="max-sm:text-xs">Participantes</li>
              </button>
            </ul>
            {children}
          </>
        ) : (
          <>
            <ul className="inline-flex gap-3 mb-4">
              <button onClick={() => handleCourseType('DadosGerais')}>
                <li className="max-sm:text-xs">Dados gerais</li>
              </button>
              <button onClick={() => handleCourseType('Participantes')}>
                <li className="font-regular  text-lg border-b-2 border-[#161250] max-sm:text-xs">
                  Participantes
                </li>
              </button>
            </ul>
            {children}
          </>
        )}
      </div>
    </div>
  )
}
