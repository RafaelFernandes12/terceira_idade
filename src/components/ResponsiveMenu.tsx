"use client";

import menu_icon from "@/assets/menu_icon.svg";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import SmsFailedRoundedIcon from "@mui/icons-material/SmsFailedRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ListItem } from "./ListItem";

export function ResponsiveMenu(){
    
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  return(
    <>
      <button onClick={toggleDrawerOpen}>
        <Image src={menu_icon} alt=''/>
      </button>
      {
        isDrawerOpen && (
          <div className="top-0 right-0 fixed bg-gray-700 w-full h-screen ">
            <div className="w-full h-full rounded-lg p-4">
              <button onClick={toggleDrawerOpen}>
                <Image src={menu_icon} alt=''/>
              </button>
              <ul className="w-full h-full flex flex-col items-center justify-center">
                <ListItem path="/" name="Course">
                  <ClassIcon className={`mr-2 ${pathname === "/" ? "text-darkBlue": "" }`}/> 
                  <span className={`${pathname === "/" ? "text-darkBlue": "" }`}>Cursos</span>
                </ListItem>

                <ListItem path="/students" name="/student">
                  <GroupsIcon className={`mr-2 ${pathname.includes("student") ? "text-darkBlue": "" }`}/> 
                  <span className={`${pathname.includes("student") ? "text-darkBlue": "" }`}>Alunos</span>
                </ListItem> 

                <hr className="my-2"/>

                <li className="my-4 py-1 px-2 w-3/4">
                  <ToggleOnRoundedIcon className="mr-2"/> 
                    Alterar tema
                </li>

                <ListItem path="/sobre" name="/sobre">
                  <SmsFailedRoundedIcon className={`mr-2 ${pathname.includes("sobre") ? "text-darkBlue": "" }`}/> 
                  <span className={`${pathname.includes("sobre") ? "text-darkBlue": "" }`}>Sobre</span>
                </ListItem>

              </ul>
            </div>
          </div>
        )
      }
    </>
  );
}