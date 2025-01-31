"use client";

import { deleteStudentSubCollection } from "@/operations/deleteStudentSubCollection";
import { getCourses } from "@/operations/getCourses";
import { getSubcollectionOfStudent } from "@/operations/getSubcollectionOfStudent";
import { updateCourseSubcollection } from "@/operations/updateCourseSubcollection";
import { getCourseProps } from "@/types/courseProps";
import { idDataProps } from "@/types/idDataProps";
// import { localProps } from '@/types/localProps'
import MoreVert from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface threeDotsStudentsProps {
  id: string;
  edit: string;
  name: string;
  remove: (id: string, name: string) => Promise<void>;
}

export function ThreeDotsStudents({
  id,
  edit,
  remove,
  name,
}: threeDotsStudentsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [courses, setCourses] = useState<getCourseProps[]>([]);
  const [subCollectionOfStudents, setSubCollectionOfStudents] = useState<
    idDataProps[]
  >([]);
  const [courseId, setCourseId] = useState<string[]>([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response);
    });
    getSubcollectionOfStudent(id).then((response) => {
      setSubCollectionOfStudents(response);
    });
  }, [id]);

  const subCollectionOfStudentsId = subCollectionOfStudents.flatMap(
    (id) => id.id,
  );
  // const allHours = subCollectionOfStudents.flatMap((item) =>
  //   item.data.courses.local.flatMap((local: localProps) => local.hour),
  // )
  // const allDays = subCollectionOfStudents.flatMap((item) =>
  //   item.data.courses.local.flatMap((local: localProps) => local.date),
  // )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCourseSubcollectionF = () => {
    updateCourseSubcollection({ studentId: id, courseIds: courseId }).then(
      () => {
        toast.success("Criado com sucesso", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          progress: undefined,
          theme: "colored",
        });
      },
    );
    setOpenDialog(!openDialog);
  };
  function removeStudent(id: string, name: string) {
    remove(id, name).then(() => {
      toast.success("Deletado com sucesso", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        progress: undefined,
        theme: "colored",
      });
    });
    handleClose();
  }
  function removeStudentSubCollection() {
    deleteStudentSubCollection({ studentId: id, courseIds: courseId }).then(
      () => {
        toast.success("Deletado com sucesso", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          progress: undefined,
          theme: "colored",
        });
      },
    );
    setOpenDialogDelete(!openDialogDelete);
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link href={`${edit}/${id}`}>
          <MenuItem>Editar</MenuItem>
        </Link>
        <MenuItem onClick={() => removeStudent(id, name)}>Excluir</MenuItem>
        <MenuItem>
          <button onClick={() => setOpenDialog(!openDialog)}>
            Adicionar cursos
          </button>
          <Dialog open={openDialog}>
            <DialogTitle>Escolha os cursos</DialogTitle>
            <DialogContent>
              <FormControl sx={{ minWidth: 120 }} className="w-full">
                <InputLabel>Curso</InputLabel>
                <Select
                  multiple
                  value={courseId}
                  label="Curso"
                  onChange={(e) => setCourseId(e.target.value as string[])}
                >
                  {courses.map((item) => {
                    // const possibleHourConflict = allHours.flatMap((hour) =>
                    //   item.data.local.flatMap((local: localProps) => {
                    //     if (local.hour === hour) return 1
                    //     return null
                    //   }),
                    // )
                    // const possibleDayConflict = allDays.flatMap((day) =>
                    //   item.data.local.flatMap((local: localProps) => {
                    //     if (local.date === day) return 1
                    //     return null
                    //   }),
                    // )
                    // console.log(possibleDayConflict)
                    // console.log(possibleHourConflict)
                    if (!subCollectionOfStudentsId.includes(item.courseId)) {
                      return (
                        <MenuItem key={item.courseId} value={item.courseId}>
                          {item.name}{" "}
                          {/* <span
                            className={`${possibleHourConflict && possibleDayConflict ? '' : 'hidden'}`}
                          >
                            conflito
                          </span> */}
                        </MenuItem>
                      );
                    }
                    return [];
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
              <Button onClick={updateCourseSubcollectionF}>Ok</Button>
            </DialogActions>
          </Dialog>
        </MenuItem>

        <MenuItem>
          <button onClick={() => setOpenDialogDelete(!openDialogDelete)}>
            deletar cursos
          </button>
          <Dialog open={openDialogDelete}>
            <DialogTitle>Delete os cursos</DialogTitle>
            <DialogContent>
              <FormControl sx={{ minWidth: 120 }} className="w-full">
                <InputLabel>Curso</InputLabel>
                <Select
                  multiple
                  value={courseId}
                  label="Curso"
                  onChange={(e) => setCourseId(e.target.value as string[])}
                >
                  {courses.map((item) => {
                    if (subCollectionOfStudentsId.includes(item.courseId)) {
                      return (
                        <MenuItem key={item.courseId} value={item.courseId}>
                          {item.name}
                        </MenuItem>
                      );
                    }
                    return [];
                  })}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialogDelete(!openDialogDelete)}>
                Cancel
              </Button>
              <Button onClick={removeStudentSubCollection}>Ok</Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </div>
  );
}
