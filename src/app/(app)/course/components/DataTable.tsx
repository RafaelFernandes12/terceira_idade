import { courseProps } from "@/types/courseProps";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Person } from "@mui/icons-material";

export default function DataTable({ professorImg, professorName, local }: courseProps) {

  return (
    <>
      <p className="font-medium p-2 text-lg">Professor</p>
      <div className="flex items-center gap-4 border-y-1 border-gray-400 p-4">
        <picture>
          <img src={professorImg} alt='' className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 
                ${professorImg?.includes("generic") ? "hidden" : "" }`}/>
          <Person className={`w-32 h-32 rounded-full max-sm:w-20 max-sm:h-20 text-black
                ${professorImg?.includes("generic") ? "" : "hidden" }`}/>
        </picture>
        <p>{professorName}</p>
      </div>
      <h1 className="mt-10">Cronograma</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dias</TableCell>
              <TableCell>Lugar</TableCell>
              <TableCell>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {local?.map((item,index) => {
              return (
                <TableRow key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">{item.date}</TableCell>
                  <TableCell>{item.place}</TableCell>
                  <TableCell>{item.startHour} - {item.endHour}</TableCell>
                </TableRow>
              );
            })}
            
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
