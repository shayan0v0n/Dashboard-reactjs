import { Box, Container} from '@mui/material'
import { useState } from 'react';
import uuid from 'react-uuid';
import AddUrlForm from '../Components/UrlControl/AddUrlForm'
import UrlCard from '../Components/UrlControl/UrlCard';
import { useFetchUrlListQuery } from '../Slices/urls-slice/urlsSplice';

interface urlData {name: string, address: string, id: string}
const UrlControl = () => {
  const urlList = useFetchUrlListQuery()  
  const currentStorage: any = localStorage.getItem("dashboard")

  return (
    <Container>
      <Box sx={{ marginBottom: '2rem' }}>
        {urlList.isSuccess ? (
          urlList.data.map((url:any) => (
            <UrlCard key={url._id} currentUrl={url}/>
          ))
        ) : <p>Loading...</p>}
      </Box>
      <AddUrlForm />
    </Container>
  )
}

export default UrlControl