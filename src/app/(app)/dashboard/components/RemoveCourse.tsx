'use client'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {deleteCourse} from '@/operations/deleteCourse'

interface deleteCourseProps {
    id: string
}

export function RemoveCourse({id} : deleteCourseProps){

    function destroyCourse(){
        deleteCourse(id)
    }

    return(
        <button onClick={destroyCourse}>
            <MoreVertIcon />
        </button>
    )
}