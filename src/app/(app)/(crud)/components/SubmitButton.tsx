'use client'
import Link from 'next/link';


export default function SubmitButton(submit: any){

    return(
        <div>
            <button className='bg-darkBlue w-24 rounded-md text-white p-2 mr-4' type={submit}>Criar</button>
            <Link href='/dashboard'>
                <button className='border-1 border-zinc-500 w-24 rounded-md text-black p-2'>Cancelar</button>
            </Link>
        </div>
    )
}
