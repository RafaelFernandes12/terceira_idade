"use client";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import SmsFailedRoundedIcon from "@mui/icons-material/SmsFailedRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideMenu(){

  const pathname = usePathname();

  return(
    <div className="bg-white rounded-[10px] py-[20px] px-[40px] flex-auto max-w-[360px]">
      <p>CPSI Web</p>
      <hr/>
      <ul>
        {pathname === "/dashboard" ?
          <>
            <li className="my-4 bg-blue-300 rounded-lg p-0.5">
              <Link href='/dashboard'>
                <ClassIcon className="mr-2 text-white"/> 
                <span className="text-blue-800">Cursos</span>
              </Link>
            </li>
            <li className="my-4 ">
              <Link href='/students'>
                <GroupsIcon className="mr-2"/> 
              Alunos
              </Link>
            </li> 
          </>
          : pathname === "/students" ?
            <>
              <li className="my-4">
                <Link href='/dashboard'>
                  <ClassIcon className="mr-2 "/> 
                  <span className="">Cursos</span>
                </Link>
              </li>
              <li className="my-4  bg-red-300 rounded-lg p-0.5">
                <Link href='/students'>
                  <GroupsIcon className="mr-2 text-white"/> 
                  <span className="text-red-800">Alunos</span>
                </Link>
              </li> 
            </>
            :           
            <>
              <li className="my-4">
                <Link href='/dashboard'>
                  <ClassIcon className="mr-2 "/> 
                  <span className="">Cursos</span>
                </Link>
              </li>
              <li className="my-4">
                <Link href='/students'>
                  <GroupsIcon className="mr-2"/> 
                  <span className="">Alunos</span>
                </Link>
              </li> 
            </>
        }
        <hr />
        <li className="my-4 ">
          <ToggleOnRoundedIcon className="mr-2"/> 
                Alterar tema
        </li>
        <li className="my-4 ">
          <Link href='/SobreNos'>
            <SmsFailedRoundedIcon className="mr-2"/> 
            <span>Sobre nós</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}