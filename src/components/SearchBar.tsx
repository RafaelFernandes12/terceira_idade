import Image from 'next/image'
import search_bar from '@/assets/search_bar.svg'
import x from '@/assets/x.svg'
export function SearchBar(){
    return (
        <div className='flex items-center w-full my-5'>
            <button className='absolute ml-2'>
                <Image src={search_bar} alt=''/>
            </button>
            <input placeholder="Procurar por nome" className='w-full border-2 border-black rounded-xl p-2 pl-10'/>
            <button className='absolute right-[340px]'>
                <Image src={x} alt=''/>
            </button>
        </div>
    )
}