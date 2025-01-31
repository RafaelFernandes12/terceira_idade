import { SearchBar } from "@/components/SearchBar";
import { SelectSemester } from "@/components/SelectSemester";
import { ThreeDotsStudents } from "@/components/ThreeDotsStudents";
import { deleteStudent } from "@/operations/deleteStudent";
import ErrorIcon from "@mui/icons-material/Error";
import { getStudents } from "@/operations/getStudents";
import { getStudentProps } from "@/types/studentProps";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import Person from "@mui/icons-material/Person";

export default async function Students({
  searchParams,
}: {
  searchParams?: { query?: string; year?: string };
}) {
  const { query = "", year = "" } = (await searchParams) ?? {};
  const students = (await getStudents(year)) as getStudentProps[];

  const filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <SearchBar />
      <div className="flex justify-end">
        <SelectSemester />
        <Link
          href="createStudent"
          className="bg-darkBlue text-white rounded-lg p-1 px-4 flex justify-between items-center w-fit max-sm:p-0.5"
        >
          <p className="max-sm:hidden">Criar estudante</p>
          <AddIcon />
        </Link>
      </div>
      {filteredStudents.map((response) => {
        const isComplete =
          response.foto &&
          response.cardiologista &&
          response.dermatologista &&
          response.vacina &&
          response.residencia &&
          response.rgFrente &&
          response.rgVerso;

        return (
          <div
            key={response.id}
            className="flex items-center justify-between border-1 border-gray-500 rounded-3xl p-4 my-6"
          >
            <Link
              href={`/student/${response.year}/${response.courseId}/${response.id}`}
            >
              {!isComplete && <ErrorIcon className="text-red-500" />}
              <div className="flex gap-4 items-center">
                {response.foto ? (
                  <img
                    src={response.foto}
                    alt=""
                    className="w-32 h-32 rounded-full bg-contain max-sm:w-20 max-sm:h-20"
                  />
                ) : (
                  <Person
                    className="w-32 h-32 rounded-full bg-contain max-sm:w-20 max-sm:h-20"
                    aria-hidden="true"
                    focusable="false"
                  />
                )}
                <div className="flex gap-2 flex-col ml-4 max-sm:text-xs">
                  <p className="w-96 max-sm:w-36 break-words">
                    {response.name}
                  </p>
                  <p>CPF: {response.cpf}</p>
                </div>
              </div>
            </Link>
            <ThreeDotsStudents
              id={response.id}
              edit="editStudent"
              name={response.name}
              remove={deleteStudent}
            />
          </div>
        );
      })}
    </>
  );
}
