"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllSemesters } from "@/operations/getAllSemesters";
import { MenuItem, Select } from "@mui/material";
import { semesterProps } from "@/types/semester";

export function SelectSemester() {
  const [semesters, setSemesters] = useState<semesterProps[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Buscar semestres ao carregar a página
  useEffect(() => {
    async function fetchSemesters() {
      const data = await getAllSemesters();
      setSemesters(data);
    }
    fetchSemesters();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const selectedYear = event.target.value;

    // Manter os parâmetros existentes e adicionar 'year'
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", selectedYear);

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get("year") || ""}
      onChange={handleChange}
      displayEmpty
      variant="standard"
    >
      <MenuItem value="">Semestres</MenuItem>
      {semesters.map((semester) => (
        <MenuItem key={semester.year} value={semester.year}>
          {semester.year}
        </MenuItem>
      ))}
    </Select>
  );
}
