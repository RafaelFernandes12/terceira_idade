import { SearchBar } from "@/components/SearchBar";
import { SelectSemester } from "@/components/SelectSemester";
import { ThreeDotsDashboard } from "@/components/ThreeDotsDashboard";
import { deleteCourse } from "@/operations/deleteCourse";
import { getCourses } from "@/operations/getCourses";
import { getCourseProps } from "@/types/courseProps";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string };
}) {
  const query = searchParams?.query || "";
  const year = searchParams?.year || "";

  const courses = (await getCourses(year)) as getCourseProps[];

  const filteredCourses = courses.filter(
    (course) => course.name.includes(query) && course.type === "Extensão",
  );
  console.log(filteredCourses);
  return (
    <div>
      <SearchBar />
      <div className="border-2 border-black rounded-lg p-4">
        <div className="flex justify-between mx-6 mb-10 mt-4">
          <ul className="inline-flex gap-3">
            <Link href="/">
              <li className="font-regular text-lg max-sm:text-sm border-b-[3px] border-darkBlue">
                Extensão
              </li>
            </Link>
            <Link href="/ensino">
              <li className="font-regular text-lg max-sm:text-sm">Ensino</li>
            </Link>
          </ul>
          <SelectSemester />

          <Link
            href="createCourse"
            className="bg-darkBlue text-white rounded-lg p-1 px-6 flex justify-between items-center max-sm:p-0.5"
          >
            <p className="max-sm:hidden">Criar curso</p>
            <AddIcon />
          </Link>
        </div>

        <div className="grid 2xl:grid-cols-4 m-0 lg:grid-cols-3 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.courseId}
              className="w-52 h-52 flex items-center flex-col m-auto mb-14"
            >
              <Link
                href={`course/${course.year}/${course.courseId}/dadosGerais`}
                className="bg-darkBlue/50 p-4 rounded-lg m-auto w-full h-full"
              >
                <img
                  src={course.courseImg}
                  alt=""
                  className={`object-cover w-full h-full 
                      ${course.courseImg ? "" : "hidden"}`}
                />
                <div
                  className={`flex items-center justify-center h-full w-full
                      ${course.courseImg ? "hidden" : ""}`}
                >
                  <span className="text-center rotate-[315deg] w-full">
                    Adicionar Foto do curso
                  </span>
                </div>
              </Link>
              <div className="flex items-center justify-between w-full">
                <span className="w-full truncate">{course.name}</span>
                <ThreeDotsDashboard
                  id={course.courseId}
                  edit="editCourse"
                  name={course.name}
                  remove={deleteCourse}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
