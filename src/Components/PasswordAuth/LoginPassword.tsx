import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useFetchUserQuery } from '../../Slices/users-slice/usersSlice';
import RegisterPassword from './RegisterPassword';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: window.innerWidth <= 600 ? 1 : 5
};

const LoginPassword = (props: {setLogin: Function}) => {
  const usersData = useFetchUserQuery()
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
  const [registerModal, setRegisterModal] = useState(false)

  const [open, setOpen] = useState(true);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(true)
  const [formValidate, setFormValidate] = useState(false)

  const handleClose = () => setOpen(false);
  const checkFormValidate = () => {
    if (password.trim().length !== 0 && (email.trim().length !== 0 && email.includes('@'))) setFormValidate(true)
    else setFormValidate(false)
}
const setLoginHandler = () => {
  const findUser = usersData.data?.findIndex((user:any) => {
    return user.email === email.trim() && user.password === password.trim()
  })

  const findCurrentUser = usersData.data?.find((user:any) => {
    return user.email === email.trim() && user.password === password.trim()
  })


  if (findUser === -1) return

  const passwordStructure: {email: string, password: string} = {
    email: email,
    password: password
  }

  const updateStorage: any[] = {
    ...currentLocalStorageJSON,
    passwordAuth: passwordStructure,
    _id: findCurrentUser?._id
  }

  localStorage.setItem('dashboard', JSON.stringify(updateStorage))
  props.setLogin()
}

  useEffect(() => {
      checkFormValidate()
  }, [email, password])


  return (
    <div>
      {registerModal ? (
        <RegisterPassword />
      ) : null}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h5" sx={{ margin: '1rem 0', textAlign: 'center' }}>
            Login
          </Typography>
          <Divider />
          <Box>
            <Grid item xs={12} md={9}>
                <Box sx={{ marginTop: '.5rem' }}>
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        id="outlined-basic" 
                        label="Email"
                        variant="outlined"
                        fullWidth 
                        sx={{ margin: '.2rem 0'}} />
                    <FormControl sx={{ margin: '.2rem 0' }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password3">Password</InputLabel>
                        <OutlinedInput
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          id="outlined-adornment-password3"
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
                        disabled={!formValidate ? true : false}
                        onClick={() => setLoginHandler()}
                        sx={{ margin: '.2rem 0', padding: '1rem' }} >Login</Button>
                </Grid>
                <Box sx={{textAlign:'center'}}>
                  <a href="#" onClick={() => {setRegisterModal(true);setOpen(false)}} style={{color: '#1565c0', textDecoration:'none'}}>I Have Not Any Account</a>
                </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginPassword