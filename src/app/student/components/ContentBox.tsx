'use client'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useCallback, useState } from 'react'

interface containerProps {
  title: string
  children: React.ReactNode
}

export function ContentBox({ title, children }: containerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  return (
    <div
      className={`border-2 border-black rounded-lg ${title === 'Atividade' ? 'max-md:hidden' : ''}`}
    >
      <div className="flex gap-2 font-semibold p-4">
        <button onClick={toggleDrawerOpen}>
          <KeyboardArrowUpIcon className={`${isDrawerOpen ? '' : 'hidden'}`} />
          <KeyboardArrowDownIcon
            className={`${isDrawerOpen ? 'hidden' : ''}`}
          />
        </button>
        <h1>{title}</h1>
      </div>
      <hr className={`border-black ${isDrawerOpen ? '' : 'hidden'}`} />
      <div className={`${isDrawerOpen ? '' : 'hidden'}`}>{children}</div>
    </div>
  )
}
