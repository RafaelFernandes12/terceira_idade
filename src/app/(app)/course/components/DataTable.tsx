import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface courseProps {
  professorImg: string,
  professorName: string,
  local: {
    date: string[],
    hour: string,
    place:string
  }
}

export default function DataTable({ professorImg, professorName, local }: courseProps) {

  return (
    <>
      <p className="font-medium p-2 text-lg">Professor</p>
      <div className="flex items-center gap-4 border-y-1 border-gray-400 p-4">
        <picture>
          <img src={professorImg} className="w-60 h-w-60 rounded-full" alt='' />
        </picture>
        <p>{professorName}</p>
      </div>
      <h1 className="mt-10">Cronograma</h1>
      <div></div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dias</TableCell>
              <TableCell>Lugar</TableCell>
              <TableCell>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {local.date}
              </TableCell>
              <TableCell>{local.hour}</TableCell>
              <TableCell>{local.place}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
