import { getCourse } from "@/operations/getCourse";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
 
interface IdProps {
    params: {
        id: string
    }
}
// const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })

export default async function Course({params}: IdProps) {

  const course = await getCourse(params.id);

  return (
        
    <div className="border-2 border-black rounded-lg p-4 ">
      {/* <NoSSR /> */}
      <div className="border-b-2 border-black w-full font-medium my-4 text-2xl">{course.name}</div>
      <ul className="flex items-center gap-4 my-4">
        <li>Dados gerais</li>
        <li>Participantes</li>
      </ul>
      <div className="flex items-center gap-4 border-y-1 border-gray-400 p-4">
        <img src={course.professorImg} className="w-28 h-28"/>
        <p>{course.professorName}</p>
      </div>
      <h1>Cronograma</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow>
            <TableCell>Dias</TableCell>
            <TableCell>Lugar</TableCell>
            <TableCell>Hora</TableCell>
          </TableRow>
          <TableBody>
            <TableRow
              key={course.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {course.local.date}
              </TableCell>
              <TableCell>{course.local.hour}</TableCell>
              <TableCell>{course.local.place}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}