'use client'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import React, { useState } from 'react'
interface dialogButtonProps {
  children: React.ReactNode
}

export function DialogButton({ children }: dialogButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)}>abrir</button>
      <Dialog open={open} keepMounted onClose={() => setOpen(!open)}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  )
}
