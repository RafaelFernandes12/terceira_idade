"use client";
import Link from "next/link";

interface SubmitButtonProps {
  onClick: () => void; // Define onClick prop as a function that takes no arguments and returns void
}

export default function SubmitButton({onClick}: SubmitButtonProps){

  return(
    <div>
      <button className='bg-darkBlue w-24 rounded-md text-white p-2 mr-4' onClick={onClick}>Criar</button>
      <Link href='/dashboard'>
        <button className='border-1 border-zinc-500 w-24 rounded-md text-black p-2'>Cancelar</button>
      </Link>
    </div>
  );
}
