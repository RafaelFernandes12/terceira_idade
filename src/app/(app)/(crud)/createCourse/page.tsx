'use client'

import {createCourse} from '@/operations/createCourse'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { ErrorText } from '@/components/ErrorText';
import Link from 'next/link';


export default function CreateCourse(){

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [img,setImg] = useState<any>()
    
    async function addCourse(e:any){
        e.preventDefault()
        if(name && img) {
            createCourse(name,img)
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
                <input type='file' onChange={e => setImg(e.currentTarget.files![0])}/>
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
