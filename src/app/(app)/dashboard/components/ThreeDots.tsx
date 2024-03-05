'use client'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {deleteCourse} from '@/operations/deleteCourse'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Link from 'next/link';

interface deleteCourseProps {
    id: string
}

export function ThreeDots({id} : deleteCourseProps){

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function destroyCourse(){
        deleteCourse(id)
    }

    return(
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <Link href={`editCourse/${id}`}>
                    <MenuItem>Editar</MenuItem>
                </Link>
                <MenuItem onClick={destroyCourse}>Excluir</MenuItem>
            </Menu>
        </>
    )
}