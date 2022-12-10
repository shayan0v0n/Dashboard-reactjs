import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react' 
import uuid from 'react-uuid'
import AddNotesForm from '../Components/Notes/AddNotesForm'
import NoteCard from '../Components/Notes/NoteCard'
import { useFetchNoteListQuery } from '../Slices/note-slice/noteSlice'

interface noteListInterface {
    "_id": string
    "title": string
    "shortDesc": string
    "text": string
    "createdAt": string
    "updatedAt": string
    "__v": number
}

const Notes = () => {
    const noteList = useFetchNoteListQuery();

    const currentStorage: any = localStorage.getItem("dashboard")

  return (
    <Container>
        <Box sx={{ marginBottom: '1rem' }}>
            {noteList.isSuccess ? (
                 noteList.data.map((item: noteListInterface) => (
                    <NoteCard note={item} key={item._id} />
                )) 
            ) : null}
        </Box>
        <AddNotesForm />
    </Container>
  )
}

export default Notes