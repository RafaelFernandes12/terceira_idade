"use client";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import SmsFailedRoundedIcon from "@mui/icons-material/SmsFailedRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import { usePathname } from "next/navigation";
import { ListItem } from "./ListItem";

export function SideMenu(){

  const pathname = usePathname();

  return(
    <div className="bg-white rounded-[10px] py-[20px] px-[40px] flex-auto w-72 font-bold max-lg:hidden ">
      <p className="text-darkBlue text-xl"><span className="font-medium">CPSI</span> Web</p>
      <hr/>
      <ul>
        <ListItem path="/" name="Course">
          <ClassIcon className={`mr-2 ${pathname === "/" ? "text-darkBlue": "" }`}/> 
          <span className={`${pathname === "/" ? "text-darkBlue": "" }`}>Cursos</span>
        </ListItem>

        <ListItem path="/students" name="/student">
          <GroupsIcon className={`mr-2 ${pathname.includes("student") ? "text-darkBlue": "" }`}/> 
          <span className={`${pathname.includes("student") ? "text-darkBlue": "" }`}>Alunos</span>
        </ListItem> 

        <hr className="my-2"/>

        <li className="my-4 py-1 px-2">
          <ToggleOnRoundedIcon className="mr-2"/> 
            Alterar tema
        </li>

        <ListItem path="/sobre" name="/sobre">
          <SmsFailedRoundedIcon className={`mr-2 ${pathname.includes("sobre") ? "text-darkBlue": "" }`}/> 
          <span className={`${pathname.includes("sobre") ? "text-darkBlue": "" }`}>Sobre</span>
        </ListItem>

      </ul>
    </div>
  );
}