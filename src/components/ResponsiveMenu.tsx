'use client'

import menuIcon from '@/assets/menuIcon.svg'
import ClassIcon from '@mui/icons-material/Class'
import GroupsIcon from '@mui/icons-material/Groups'
import { Drawer, List } from '@mui/material'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ListItem } from './ListItem'

export function ResponsiveMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const pathname = usePathname()

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  return (
    <>
      <button onClick={toggleDrawerOpen}>
        <Image src={menuIcon} alt="" />
      </button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        variant="temporary"
        onClose={toggleDrawerOpen}
      >
        <div className="w-48 rounded-lg p-4">
          <List component="nav">
            <ul>
              <ListItem path="/" name="Course">
                <ClassIcon
                  className={`mr-2 ${pathname === '/' ? 'text-darkBlue' : ''}`}
                />
                <span className={`${pathname === '/' ? 'text-darkBlue' : ''}`}>
                  Cursos
                </span>
              </ListItem>

              <ListItem path="/students" name="/student">
                <GroupsIcon
                  className={`mr-2 ${pathname.includes('student') ? 'text-darkBlue' : ''}`}
                />
                <span
                  className={`${pathname.includes('student') ? 'text-darkBlue' : ''}`}
                >
                  Alunos
                </span>
              </ListItem>
            </ul>
          </List>
        </div>
      </Drawer>
    </>
  )
}
