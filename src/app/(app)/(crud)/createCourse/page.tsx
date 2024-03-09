'use client'

import { ErrorText } from '@/components/ErrorText';
import { createCourse } from '@/operations/createCourse';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateCourse(){

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [img,setImg] = useState<any>()
    const [type, setType] = useState('Extensão')

    async function addCourse(e:any){
        e.preventDefault()
        if(name && img && type) {
            createCourse(name,img,type)
            alert('criado com sucesso')
        }
        else {
            setError('Todas os campos tem que estar preenchidos')            
        }
    }

    return(
        <form className='flex flex-col justify-center' onSubmit={addCourse}>
            <h1 className='font-semibold text-2xl my-7'>Criar curso</h1>
            <div className='mb-4'>
                <TextField label='Nome:' className='w-full rounded-lg' 
                value={name}
                onChange={e => setName(e.target.value)}
                />

                <TextField type='file' onChange={e => setImg(e.currentTarget.files![0])}/>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="demo-select-small-label">Tipo</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={type}
                        label="Extensão"
                        defaultValue='Extensão'
                        onChange={e => setType(e.target.value)}
                    >
                        <MenuItem value="Extensão">Extensão</MenuItem>
                        <MenuItem value="Ensino">Ensino</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <button className='bg-darkBlue w-24 rounded-md text-white p-2 mr-4' type='submit'>Criar</button>
                <Link href='/dashboard'>
                    <button className='border-1 border-zinc-500 w-24 rounded-md text-black p-2'>Cancelar</button>
                </Link>
            </div>
            <ErrorText error={error}/>

        </form>
    )
}
