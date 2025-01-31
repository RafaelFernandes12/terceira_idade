"use client";

import Search from "@mui/icons-material/Search";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(searchTerm: string) {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center w-full my-5">
      <button type="button" className="absolute ml-2">
        <Search />
      </button>
      <input
        placeholder="Procurar por nome"
        className="w-full border-2 border-black rounded-xl p-2 pl-10"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
