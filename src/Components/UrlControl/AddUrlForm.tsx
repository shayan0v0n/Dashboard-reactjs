import { Box, Button, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAddUrlListMutation } from '../../Slices/urls-slice/urlsSplice'
import { useAddUserUrlsMutation } from '../../Slices/users-slice/userUrlsSlice'
type urlStructure = { name:string, address:string }

const AddUrlForm = () => {
    const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
    const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
    const [addUrlList] = useAddUrlListMutation()
    const [addUserUrl] = useAddUserUrlsMutation()
    const [ urlName, setUrlName ] = useState('');
    const [ urlAddress, setUrlAddress ] = useState('');
    const [formValidate, setFormValidate] = useState(false)
    useEffect(() => {
        checkFormValidate()
    }, [urlName, urlAddress])
    
    const checkFormValidate = () => {
        if (urlName.trim().length !== 0 && urlAddress.trim().length !== 0) setFormValidate(true)
        else setFormValidate(false)
    }

    const addUrlHandler = (urlName: string, urlAddress: string): void => {
      const createUrl:urlStructure = {
        name: urlName,
        address: urlAddress
      }
      addUrlList(createUrl).then(({data}:any) => {
          const userUrlParams: {
            userId:string,
            urlId:string
          } = {
              userId: currentLocalStorageJSON._id,
              urlId:  data._id
          }

          addUserUrl(userUrlParams)
      })
    }
    
    const formControlhandler = () => {        
        addUrlHandler(urlName, urlAddress)
        setUrlName('')
        setUrlAddress('')
    }


  return (
    <Grid container gap={1} justifyContent="space-around">
    <Grid item xs={12} md={9}>
      <Box>
        <TextField 
            onChange={(e) => setUrlName(e.target.value)}
            value={urlName}
            id="outlined-basic" 
            label="URL Name"
            variant="outlined" 
            fullWidth 
            sx={{ margin: '.2rem 0' }} />
        <TextField 
            onChange={(e) => setUrlAddress(e.target.value)}
            value={urlAddress}
            id="outlined-basic" 
            label="URL Address"
            variant="outlined" 
            fullWidth 
            sx={{ margin: '.2rem 0' }} />
      </Box>
    </Grid>
    <Grid item xs={12} md={2}>
        <Button 
            fullWidth 
            variant='contained' 
            color='primary'
            sx={{ margin: '.2rem 0', height: '95%' }}
            disabled={formValidate ? false : true}
            onClick={() => {formControlhandler()}}>Add Url</Button>
    </Grid>
  </Grid>
  )
}

export default AddUrlForm