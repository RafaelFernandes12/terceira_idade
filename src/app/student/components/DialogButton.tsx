'use client'
import SchoolIcon from '@mui/icons-material/School'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import React, { useState } from 'react'
interface dialogButtonProps {
  children: React.ReactNode
}

export function DialogButton({ children }: dialogButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}>
        <SchoolIcon />
      </button>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(!open)}
        maxWidth="xl"
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  )
}
