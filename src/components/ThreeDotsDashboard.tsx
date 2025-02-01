"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

interface props {
  id: string;
  year: string;
  courseName: string;
  remove: (courseId: string, courseName: string, year: string) => void;
}

export function ThreeDotsDashboard({ id, remove, year, courseName }: props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <MoreVertIcon />
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
        <Link href={`editCourse/${year}/${id}`}>
          <MenuItem>Editar</MenuItem>
        </Link>
        <MenuItem onClick={() => remove(id, year, courseName)}>
          Excluir
        </MenuItem>
      </Menu>
    </div>
  );
}
