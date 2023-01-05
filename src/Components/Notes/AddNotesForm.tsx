import { Box, TextField, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useAddNoteListMutation } from '../../Slices/note-slice/noteSlice'
import { useAddUserNoteListMutation } from '../../Slices/users-slice/userNoteListSlice'

const AddNotesForm = () => {
    const [addNoteList] = useAddNoteListMutation()
    const [addUserNoteList] = useAddUserNoteListMutation()
    const [ title, setTitle ] = useState('')
    const [text, setText] = useState('')
    const [shortDesk, setShortDesc] = useState('')
    const [formValidate, setFormValidate] = useState(false)
    const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
    const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

    useEffect(() => {
        checkPassowrdForm()
    }, [title, text, shortDesk])

    const checkPassowrdForm = () => {
        if ((title.trim().length !== 0 && text.trim().length !== 0) && shortDesk.trim().length <= 30) setFormValidate(true)
        else setFormValidate(false)
    }

    const addNoteItemHandler = () => {
        const noteStructuredItem = {
            title: title,
            shortDesc: shortDesk, 
            text: text,
        }

        addNoteList(noteStructuredItem).then((note:any) => {
            const userNoteListParams: {
                userId:string,
                noteId:string
            } = {
                userId: currentLocalStorageJSON._id,
                noteId:  note.data._id
            }
            
            addUserNoteList(userNoteListParams)
        })
        setTitle('')
        setText('')
        setShortDesc('')
    }


  return (
    <Box>
        <Grid container textAlign="center" justifyContent="space-around">
            <Grid item xs={12} md={9}>
                <Box>
                    <TextField 
                        label="Title" 
                        sx={{marginBottom:'.5rem'}} 
                        value={title}
                        onChange={ (e) => setTitle(e.target.value) }
                        fullWidth />

                    <TextField 
                        label="Short Desc" 
                        sx={{marginBottom:'.5rem'}} 
                        value={shortDesk}
                        onChange={ (e) => setShortDesc(e.target.value) }
                        fullWidth />

                    <TextField 
                        label="Text" 
                        sx={{marginBottom:'.5rem'}} 
                        rows={5} 
                        value={text}
                        onChange={ (e) => setText(e.target.value) }
                        fullWidth 
                        multiline />
                </Box>
            </Grid>
            <Grid item xs={12} md={2}>
                <Button 
                    variant='contained' 
                    sx={{ margin: '.2rem 0', height: '95%' }} 
                    disabled={formValidate ? false : true}
                    onClick={() => addNoteItemHandler()}
                    fullWidth>ADD NOTES</Button>
            </Grid>
        </Grid>
    </Box>
  )
}

export default AddNotesForm