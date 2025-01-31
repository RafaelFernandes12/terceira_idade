/* eslint-disable @next/next/no-img-element */
import { getStudentProps } from "@/types/studentProps";
import { Person } from "@mui/icons-material";
import Link from "next/link";

interface studentDataProps {
  students: getStudentProps[];
}

export default function StudentData({ students }: studentDataProps) {
  if (students.length === 0) return <div>Nenhum aluno encontrado</div>;
  return (
    <>
      {students.map((student) => {
        return (
          <div
            className="border-1 border-gray-500 rounded-3xl flex items-center p-4 my-6 max-md:text-xs"
            key={student.id}
          >
            <Link href={`/student/${student.id}`}>
              {student.foto ? (
                <img
                  src={student.foto}
                  alt=""
                  className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
${student.foto ? "" : "hidden"}`}
                />
              ) : (
                <Person
                  className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
${student.foto ? "hidden" : ""}`}
                />
              )}
            </Link>
            <div className="flex gap-2 flex-col ml-4">
              <span className="break-words w-96 max-sm:w-36">
                {student.name}
              </span>
              <span className="break-words w-96 max-sm:w-36">
                {student.cpf}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
