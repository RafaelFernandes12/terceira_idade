import { data } from "@/data";
import Image from "next/image";


export default function StudentData() {


  return (
    <>
      {data.map(item => {
        return (
          <div key={item.cpf} className="border-1 border-gray-500 rounded-3xl flex items-center p-4 my-6">
            <Image src={item.img} alt='' className="w-32 h-auto"/>
            <div className="flex gap-2 flex-col ml-4">
              <span>{item.name}</span>
              <span>{item.cpf}</span>
            </div>
          </div>
        );
      })}
    </>

  );
}