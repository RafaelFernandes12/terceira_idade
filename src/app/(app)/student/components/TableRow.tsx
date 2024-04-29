"use client";
import { editStudentImage } from "@/operations/editStudentImage";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface tableRowProps{
    id: string,
    name: string,
    title: string,
    data:string,
    idHtml:string,
}

export function TableRow({id,name, title,data,idHtml}: tableRowProps){

  const [open,setOpen] = useState(false);
  const [img,setImg] = useState<any>("generic");
  function editStudentImg(){
    editStudentImage({id,name,img}).then(() => {
      toast.success("Criado com sucesso", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }).catch(e => {
      toast.error(e.toString(), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  }

  return(
    <>
      <tr className="border-2 border-black max-sm:text-sm">
        <td className="border-2 border-black w-[5%] p-4 text-center">
          <button onClick={() => setOpen(!open)}>
            <DoneIcon className={`text-green-500 rounded-full border-2 border-green-500 ${data.includes("generic") ? "hidden": ""}`}/>
            <ErrorIcon className={`text-red-500 rounded-full ${data.includes("generic") ? "": "hidden"}`}/>
          </button>
        </td>
        <td className="pl-4 w-[90%]">{title}</td>
        <td className="pr-4 h-full w-full">
          <div className="flex gap-3 items-center justify-center">
            <label htmlFor={idHtml}>
              <DownloadIcon className="sm:hidden cursor-pointer"/>
            </label>
            <input onChange={e => setImg(e.currentTarget.files![0])} id={idHtml} type="file" className="max-sm:hidden"/>
            <button onClick={editStudentImg}>
              <UploadIcon />
            </button>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
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