'use client'

import { getStudents } from '@/operations/getStudents'
import { updateStudentSubcollection } from '@/operations/updateStudentSubcollection'
import { getStudentProps } from '@/types/studentProps'
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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface threeDotsDashboardProps {
  id: string
  edit: string
  name: string
  remove: (id: string, name: string) => Promise<void>
}

export function ThreeDotsDashboard({
  id,
  edit,
  remove,
  name,
}: threeDotsDashboardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [students, setStudents] = useState<getStudentProps[]>([])
  const [studentId, setStudentId] = useState<string[]>([])
  const open = Boolean(anchorEl)

  useEffect(() => {
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

  const updateStudentSubcollectionF = () => {
    updateStudentSubcollection({ courseId: id, studentId }).then(() => {
      toast.success('Criado com sucesso', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        progress: undefined,
        theme: 'colored',
      })
    })
    setOpenDialog(!openDialog)
  }
  function removeStudent(id: string, name: string) {
    remove(id, name).then(() => {
      toast.success('Deletado com sucesso', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        progress: undefined,
        theme: 'colored',
      })
    })
    handleClose()
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
        <MenuItem onClick={() => removeStudent(id, name)}>Excluir</MenuItem>
        <MenuItem>
          <button onClick={() => setOpenDialog(!openDialog)}>
            Adicionar Estudante
          </button>
          <Dialog open={openDialog}>
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
                        {item.name}
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
      </Menu>
    </div>
  )
}
