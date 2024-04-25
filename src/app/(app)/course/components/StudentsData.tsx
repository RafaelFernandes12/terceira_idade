import { idDataProps } from "@/types/idDataProps";
import { Person } from "@mui/icons-material";

export default function StudentData({id,data} : idDataProps) {

  return (
    <>
      {data.map((item: any,index:number) => {
        if(item.data.courseId.includes(id)){
          return (
            <div key={index} className="border-1 border-gray-500 rounded-3xl flex items-center p-4 my-6 max-md:text-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.data.foto} alt='' className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
                ${item.data.foto.includes("generic") ? "" : "hidden" }`}/>
              <Person className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
                ${item.data.foto.includes("generic") ? "hidden" : "" }`}/>
              <div className="flex gap-2 flex-col ml-4">
                <span className="truncate w-96">{item.data.name}</span>
                <span>{item.data.cpf}</span>
              </div>
            </div>
          );
        }
      })}
    </>

  );
}