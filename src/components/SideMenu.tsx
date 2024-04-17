"use client";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import SmsFailedRoundedIcon from "@mui/icons-material/SmsFailedRounded";
import ToggleOnRoundedIcon from "@mui/icons-material/ToggleOnRounded";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface listItemProps{
  path:string,
  name: string,
  children: React.ReactNode
}

function ListItem({path, name, children} : listItemProps){

  const pathname = usePathname();

  return(
    <>
      {
        pathname.includes(name) ? 
          <li className={`my-4 flex items-center rounded-full ${pathname.includes(name) ? "bg-darkBlue/20": ""}`}>
            <motion.a href={path}
              className="rounded-full py-1 px-2"
            >
              {children}
            </motion.a>
          </li>
          : 
          <li className={`my-4 flex items-center rounded-full ${pathname.includes(name) ? "bg-darkBlue/20": ""}`}>
            <motion.a href={path}
              className="rounded-full py-1 px-2"
              initial={{width: 0, display: "flex"}}
              whileHover={{width: "calc(100%)", backgroundColor:"rgb(22 18 80 / 0.2)"}}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.a>
          </li>
      }
    </>
  );
}

export function SideMenu(){

  const pathname = usePathname();

  return(
    <div className="bg-white rounded-[10px] py-[20px] px-[40px] flex-auto w-72 font-bold max-lg:hidden ">
      <p className="text-darkBlue text-xl"><span className="font-medium">CPSI</span> Web</p>
      <hr/>
      <ul>
        <ListItem path="/dashboard" name="dashboard">
          <ClassIcon className={`mr-2 ${pathname.includes("dashboard") ? "text-darkBlue": "" }`}/> 
          <span className={`${pathname.includes("dashboard") ? "text-darkBlue": "" }`}>Cursos</span>
        </ListItem>

        <ListItem path="/students" name="student">
          <GroupsIcon className={`mr-2 ${pathname.includes("student") ? "text-darkBlue": "" }`}/> 
          <span className={`${pathname.includes("student") ? "text-darkBlue": "" }`}>Alunos</span>
        </ListItem> 

        <hr className="my-2"/>

        <li className="my-4 py-1 px-2">
          <ToggleOnRoundedIcon className="mr-2"/> 
            Alterar tema
        </li>

        <ListItem path="/sobre" name="sobre">
          <SmsFailedRoundedIcon className={`mr-2 ${pathname.includes("sobre") ? "text-darkBlue": "" }`}/> 
          <span className={`${pathname.includes("sobre") ? "text-darkBlue": "" }`}>Sobre</span>
        </ListItem>

      </ul>
    </div>
  );
}