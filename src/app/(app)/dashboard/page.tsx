import { SearchBar } from "@/components/SearchBar";
import arrow_down from '@/assets/arrow_down.svg'
import dumbell from '@/assets/dumbell.svg'
import Image from 'next/image'
import { getCourses } from "@/operations/getCourses";
import { RemoveCourse } from "./components/RemoveCourse";

export default async function Home() {

  const courses = await getCourses()


  return (
    <div>
      <SearchBar />
      <div className="border-2 border-black rounded-lg p-4">
      <div className="flex justify-between mx-6 mb-10 mt-4">
        <div className="">
          <ul className="inline-flex gap-3">
            <button>
              <li>Extensão</li>
            </button>
            <button>
              <li>Ensino</li>
            </button>
          </ul>
        </div>
        <div className="bg-darkBlue text-white rounded-lg p-1 px-6 flex space-between items-center gap-4">
            <button>Filtro</button>
            <Image src={arrow_down} alt=''/>
        </div>
      </div>

      <div className="grid grid-cols-4 m-0">
      {courses.map((response => {
        return(
          <div key={response.id} className="max-w-28 flex items-center flex-col m-auto">
            <Image src={dumbell} alt='' className="bg-violet p-4 rounded-lg w-full m-auto"/>
            <span className="w-full">{response.data.name}</span>
              <RemoveCourse id={response.id}/>
          </div>
        )
      }))}
      </div>
      </div>
    </div>
  );
}