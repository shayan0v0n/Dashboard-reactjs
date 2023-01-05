import React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeleteNoteListMutation } from '../../Slices/note-slice/noteSlice';
import { useRemoveUserNoteListMutation } from '../../Slices/users-slice/userNoteListSlice'
interface noteListInterface {
    "_id": string
    "title": string
    "shortDesc": string
    "text": string
    "createdAt": string
    "updatedAt": string
    "__v": number
}
interface noteCardProps {
    note: noteListInterface
}

const NoteCard = (props: noteCardProps) => {
    const [deleteNote] = useDeleteNoteListMutation()
    const [deleteUserNoteList] = useRemoveUserNoteListMutation()
    const {note} = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
    const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  
    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}

    const deleteNoteHandler = (noteId:string) => {
        deleteNote(noteId).then((note:any) => {
            const userNoteListParams: {
                userId:string,
                noteId:string
            } = {
                userId: currentLocalStorageJSON._id,
                noteId:  note.data._id
            }
            
            deleteUserNoteList(userNoteListParams)
        })
    }

  return (
    <>
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Button id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                sx={{margin: 0, padding: 0}}
                onMouseEnter={menuHandleClick}><MoreVertIcon /></Button>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {note.title}
            </Typography>
            { note.shortDesc.trim().length !== 0 ? (
                <Typography sx={{ color: 'text.secondary' }}>{note.shortDesc}...</Typography>
            ) : null}
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{note.text}</Typography>
            </AccordionDetails>
            <Menu 
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  sx={{ margin: 'auto' }}
                  onClose={menuHandleClose}
                  MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
            >
            <MenuItem onClick={() => {}}>Edit</MenuItem>
            <MenuItem onClick={() => deleteNoteHandler(note._id)}>Delete</MenuItem>
          </Menu>
    </Accordion>
    </>
  )
}

export default NoteCard