'use client'

import loupe from '@/assets/loupe.svg'
import Image from 'next/image'

interface searchBarProps {
  onChange: (e: string) => void
}

export function SearchBar({ onChange }: searchBarProps) {
  return (
    <div className="flex items-center w-full my-5">
      <button className="absolute ml-2">
        <Image src={loupe} alt="" />
      </button>
      <input
        placeholder="Procurar por nome"
        className="w-full border-2 border-black rounded-xl p-2 pl-10"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
