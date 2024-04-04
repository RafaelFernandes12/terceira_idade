"use client";

import menu_icon from "@/assets/menu_icon.svg";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import SmsFailedRoundedIcon from "@mui/icons-material/SmsFailedRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import { Drawer, List } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

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
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        variant="temporary"
        onClose={toggleDrawerOpen}
      >
        <div className="w-48 rounded-lg p-4">
          <List component="nav">
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
          </List>
        </div>
      </Drawer>
    </>
  );
}