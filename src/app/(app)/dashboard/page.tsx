import { getCourses } from "@/operations/getCourses";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { ThreeDots } from "./components/ThreeDots";

export default async function Home() {

  const courses = await getCourses();

  return (
    <div>
      <h1 className="text-[24px]">Cursos</h1>
      <div className="flex justify-between">
        <div>
          <ul className="inline-flex gap-3">
            <button>
              <li>Extensão</li>
            </button>
            <button>
              <li>Ensino</li>
            </button>
          </ul>
        </div>
        <Link href='createCourse' className="text-black rounded-lg p-1 px-6 flex space-between items-center"
        >Criar curso
          <AddIcon />
        </Link>
      </div>

      <div className="grid grid-cols-4">
        {courses.map((response => {
          return (
            <div key={response.id} className="w-48 flex items-center flex-col m-auto">
              <img src={response.data.imgUrl} className="bg-violet p-4 rounded-lg w-full h-full m-auto" />
              <span className="w-full truncate">{response.data.name}</span>
              <ThreeDots id={response.id} />
            </div>
          );
        }))}
      </div>
    </div>
  );
}