import { Box, Button, Grid, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useAddPasswordMutation } from '../../Slices/password-saver-slice/passwordSaverSlice';
import { useAddUserPasswordMutation } from '../../Slices/users-slice/userPasswordSlice';
interface currentPassowrdsStructure {title: string, password: string}
interface AddPasswordFormProps {
   login: boolean
}

const AddPasswordForm = (props: AddPasswordFormProps) => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
  const [addPassword] = useAddPasswordMutation()
  const [addUserPassword] = useAddUserPasswordMutation();
  const { login } = props
    const [title, setTitle] = useState('')
    const [password, setPassword] = useState('')
    const [passwordStatus, setPasswordStatus] = useState(true)
    const [formValidate, setFormValidate] = useState(false)

    useEffect(() => {
        checkPassowrdForm()
    }, [title, password])

    const checkPassowrdForm = () => {
      if (title.trim().length !== 0 && password.trim().length !== 0) setFormValidate(true)
      else setFormValidate(false)
    }

    const addPassowrdFormHandler = () => {
      const addPasswordStructure: currentPassowrdsStructure = {title: title, password: password}
      addPassword(addPasswordStructure).then(({data}:any) => {
        const passwordParams:{userId:string, passId:string} = {
          userId: currentLocalStorageJSON._id,
          passId: data._id
        }

        addUserPassword(passwordParams)
      })
      setTitle('')
      setPassword('')
    }

  return (
    <Grid container gap={1} justifyContent="space-around" sx={{ marginTop: '1rem' }}>
    <Grid item xs={12} md={9}>
      <Box>
        <TextField 
            onChange={e => setTitle(e.target.value)}
            value={title}
            id="outlined-basic" 
            label="Title"
            variant="outlined"
            fullWidth 
            disabled={login ? true : false}
            sx={{ margin: '.2rem 0'}} />

        <FormControl sx={{ margin: '.2rem 0' }}  variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onChange={e => setPassword(e.target.value)}
              id="outlined-adornment-password"
              value={password}
              disabled={login ? true : false}
              sx={{ margin: '.2rem 0'}}
              type={passwordStatus ? 'password' : 'text'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordStatus(!passwordStatus)}
                    edge="end"
                  >
                    {passwordStatus ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
        </FormControl>
      </Box>
    </Grid>
    <Grid item xs={12} md={2}>
      <Button
          fullWidth 
          variant='contained' 
          color='primary'
          sx={{ margin: '.2rem 0', height: '95%' }}
          disabled={formValidate && !login ? false : true}
          onClick={addPassowrdFormHandler} >Add Password</Button>
    </Grid>
    </Grid>
  )
}

export default AddPasswordForm