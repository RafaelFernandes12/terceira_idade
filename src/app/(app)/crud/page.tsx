'use client'
import {createCourse} from '@/operations/createCourse'
import { useState } from 'react'


export default function Crud(){

    const [name,setName] = useState('')
    const [newName, setNewName] = useState('')

    const courseId = createCourse

    async function addCourse(){
        createCourse(name)
    }

    return(
        <div>
                <input onChange={e => setName(e.target.value)} value={name} placeholder='escreva aqui'/>
                <button onClick={addCourse}>criar curso</button>
        </div>
    )
}