import Image from "next/image";
import CPSIWeb from "../assets/CPSI Web.svg";
import { ResponsiveMenu } from "./ResponsiveMenu";

export function Header(){
  return(
    <div className='flex justify-between items-center bg-darkBlue p-6 lg:hidden w-full'>
      <div className='ml-4'>
        <Image src={CPSIWeb} alt=''/>        
      </div>
      <div className='mr-4 bg-white/25 p-3 rounded-xl'>
        <ResponsiveMenu />
      </div>
    </div>
  );
}