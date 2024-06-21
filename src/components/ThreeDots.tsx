'use client'

import { getCourses } from '@/operations/getCourses'
import { getStudents } from '@/operations/getStudents'
import { updateCourseSubcollection } from '@/operations/updateCourseSubcollection'
import { updateStudentSubcollection } from '@/operations/updateStudentSubcollection'
import { idDataProps } from '@/types/idDataProps'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface threeDotsProps {
  id: string
  edit: string
  isStudent: boolean
  name: string
  remove: (id: string, name: string) => void
}

export function ThreeDots({
  id,
  edit,
  remove,
  name,
  isStudent,
}: threeDotsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [courses, setCourses] = useState<idDataProps[]>([])
  const [students, setStudents] = useState<idDataProps[]>([])
  const [studentId, setStudentId] = useState<string[]>([])
  const [courseId, setCourseId] = useState<string[]>([])
  const open = Boolean(anchorEl)

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response)
    })
    getStudents().then((response) => {
      setStudents(response)
    })
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const updateCourseSubcollectionF = () => {
    updateCourseSubcollection({ studentId: id, courseIds: courseId }).then(
      () => {
        toast.success('Criado com sucesso', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      },
    )
    setOpenDialog(!openDialog)
  }

  const updateStudentSubcollectionF = () => {
    updateStudentSubcollection({ courseId: id, studentId }).then(() => {
      toast.success('Criado com sucesso', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    })
    setOpenDialog(!openDialog)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link href={`${edit}/${id}`}>
          <MenuItem>Editar</MenuItem>
        </Link>
        <MenuItem onClick={() => remove(id, name)}>Excluir</MenuItem>
        <MenuItem className={`${isStudent ? 'hidden' : ''}`}>
          <button onClick={() => setOpenDialog(!openDialog)}>
            Adicionar Estudante
          </button>
          <Dialog open={openDialog} className={`${isStudent ? 'hidden' : ''}`}>
            <DialogTitle>Escolha os estudantes</DialogTitle>
            <DialogContent>
              <FormControl sx={{ minWidth: 120 }} className="w-full">
                <InputLabel>Estudantes</InputLabel>
                <Select
                  multiple
                  value={studentId}
                  label="Estudante"
                  onChange={(e) => setStudentId(e.target.value as string[])}
                >
                  {students.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.data.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
              <Button onClick={() => updateStudentSubcollectionF()}>Ok</Button>
            </DialogActions>
          </Dialog>
        </MenuItem>

        <MenuItem className={`${isStudent ? '' : 'hidden'}`}>
          <button onClick={() => setOpenDialog(!openDialog)}>
            Adicionar cursos
          </button>
          <Dialog open={openDialog} className={`${isStudent ? '' : 'hidden'}`}>
            <DialogTitle>Escolha os cursos</DialogTitle>
            <DialogContent>
              <FormControl sx={{ minWidth: 120 }} className="w-full">
                <InputLabel>Curso</InputLabel>
                <Select
                  multiple
                  value={courseId}
                  label="Curso"
                  onChange={(e) => setCourseId(e.target.value as string[])}
                >
                  {courses.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.data.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
              <Button onClick={updateCourseSubcollectionF}>Ok</Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
