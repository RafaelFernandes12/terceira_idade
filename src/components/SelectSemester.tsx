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

  // Função para manipular a troca de semestre
  const handleChange = (event: any) => {
    const selectedYear = event.target.value;

    // Manter os parâmetros existentes e adicionar 'year'
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", selectedYear);

    router.push(`?${params.toString()}`); // Atualiza a URL sem perder os outros parâmetros
  };

  return (
    <Select
      value={searchParams.get("year") || ""}
      onChange={handleChange}
      displayEmpty
      variant="standard"
    >
      <MenuItem value="">Selecione um semestre</MenuItem>
      {semesters.map((semester) => (
        <MenuItem key={semester.year} value={semester.year}>
          {semester.year}
        </MenuItem>
      ))}
    </Select>
  );
}
