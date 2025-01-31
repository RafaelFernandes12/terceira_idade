'use client'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { createSemester } from '@/operations/createSemester'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export function Modal() {
  const [open, setOpen] = useState(false)
  const [year, setYear] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  async function addSemester() {
    if (!year || !start || !end) {
      toast.error('Preencha todos os campos', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        progress: undefined,
        theme: 'colored',
      })
      return
    }

    createSemester({
      year,
      start,
      end,
    })
      .then((res) => {
        console.log(res)
        toast.success('Semestre criado com sucesso', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          progress: undefined,
          theme: 'colored',
        })
        setOpen(false) // Close the modal after successful creation
        setYear('') // Reset form fields
        setStart('')
        setEnd('')
      })
      .catch((e) => {
        toast.error(`Erro ao criar semestre: ${e.message}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          progress: undefined,
          theme: 'colored',
        })
        console.error(e)
      })
  }

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Criar Semestre</button>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(!open)}
        maxWidth="xl"
      >
        <DialogContent>
          <h1>Criar Semestre</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              addSemester()
            }}
          >
            <TextField
              label="Ano"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Começo do Ano"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Final do Ano"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Criar Semestre
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
