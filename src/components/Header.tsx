import sino_icon from '../assets/sino_icon.svg'
import menu_icon from '../assets/menu_icon.svg'
import Image from 'next/image'
import Link from 'next/link'

export function Header(){
    return(
        <div className='flex justify-between items-center bg-darkBlue p-6'>
            <div className='ml-4 bg-gradient-to-b from-white/30 to-white/20 p-3 rounded-xl'>
                <Image src={sino_icon} alt='' width='20'/>        
            </div>
            <div className='mr-4 bg-gradient-to-b from-white/30 to-white/20 p-3 rounded-xl'>
                <Link href=''>
                    <Image src={menu_icon} alt='' width='25'/>
                </Link>        
            </div>
        </div>
    )
}