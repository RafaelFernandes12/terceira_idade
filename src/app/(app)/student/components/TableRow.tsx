"use client";
import { editStudentImage } from "@/operations/editStudentImage";
import DoneIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorIcon from "@mui/icons-material/Error";
import UploadIcon from "@mui/icons-material/Upload";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

interface tableRowProps{
    id: string,
    name: string,
    title: string,
    data:string
}

export function TableRow({id,name, title,data}: tableRowProps){

  const [open,setOpen] = useState(false);
  const [img,setImg] = useState<any>("generic");
  function editStudentImg(){
    editStudentImage({id,name,img});
  }

  return(
    <>
      <tr className="border-2 border-black">
        <td className="border-2 border-black w-[5%] p-4 text-center">
          <button onClick={() => setOpen(!open)}>
            <DoneIcon className={`text-green-500 rounded-full border-2 border-green-500 ${data.includes("generic") ? "hidden": ""}`}/>
            <ErrorIcon className={`text-red-500 rounded-full ${data.includes("generic") ? "": "hidden"}`}/>
          </button>
        </td>
        <td className="pl-4 w-[90%]">{title}</td>
        <td className="pr-4 h-full w-full">
          <div className="flex gap-3 items-center justify-center">
            <input onChange={e => setImg(e.currentTarget.files![0])} id="file-input" type="file"/>
            <button onClick={editStudentImg}>
              <UploadIcon />
            </button>
          </div>
        </td>
      </tr>
      <Dialog open={open} 
        keepMounted
        onClose={() => setOpen(!open)}
      >
        <DialogContent>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data} alt=""/>
        </DialogContent>
      </Dialog>
    </>
  );
}