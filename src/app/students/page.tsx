"use client";

import { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";

export default function Students() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const year = searchParams.get("year") ?? "";
  const [students, setStudents] = useState<getStudentProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getStudents(year);
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [year]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase()),
  );

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

      {loading && <p>Carregando estudantes, aguarde um momento!</p>}
      {filteredStudents.length === 0 && <p>Nenhum estudante encontrado</p>}
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
            <Link href={`/student/${response.id}`}>
              {!isComplete && <ErrorIcon className="text-red-500" />}
              <div className="flex gap-4 items-center">
                {response.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
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
