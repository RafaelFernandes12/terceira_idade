import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

interface tableRowProps{
    title: string,
    data:string
}
export function TableRow({title,data}: tableRowProps){
  return(
    <tr className="border-2 border-black">
      <td className="border-2 border-black w-[5%] p-4 text-center">
        <DoneIcon className={`text-green-500 rounded-full border-2 border-green-500 ${data ? "": "hidden"}`}/>
        <ErrorIcon className={`text-red-500 rounded-full ${data ? "hidden": ""}`}/>
      </td>
      <td className="pl-4">{title}</td>
    </tr>
  );
}