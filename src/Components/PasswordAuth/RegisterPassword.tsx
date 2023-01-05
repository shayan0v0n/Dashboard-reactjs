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
import { useAddUserMutation, useFetchUserQuery } from '../../Slices/users-slice/usersSlice';
import LoginPassword from './LoginPassword';

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

const RegisterPassword = () => {
  const usersData = useFetchUserQuery()
  const [userAdd] = useAddUserMutation()
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  const [open, setOpen] = useState(true);
  const [ email, setEmail ] = useState('');
  const [loginModal, setLoginModal] = useState(false)
  const [loginStatus, setLoginStatus] = useState(true)
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(true)
  const [formValidate, setFormValidate] = useState(false)

  const handleClose = () => setOpen(false);
  const checkFormValidate = () => {
    if (email.trim().length !== 0 && password.trim().length !== 0) {
      if (confirmPassword.trim() === password.trim()) {
        setFormValidate(true)
      }else setFormValidate(false)
    }
    else setFormValidate(false)
}
const setPasswordAuthHandler = () => {
  const findUser = usersData.data?.findIndex((user:any) => {
    return user.email === email.trim()
  })

  if (findUser !== -1) return

  
  
  userAdd({email, password}).then((user:any) => {
    const passwordStructure: {email: string, password: string, _id:string} = {
      email: email,
      password: password,
      _id: user.data._id 
    }
    const updateStorage: any[] = {
      ...currentLocalStorageJSON,
      passwordAuth: passwordStructure
    }
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  })
  

  handleClose()


}

const setLoginHandler = () => {
  setLoginModal(false)
  setLoginStatus(false)
}

  useEffect(() => {
      checkFormValidate()
  }, [email, password, confirmPassword])

  return (
    <div>
      {loginModal ? (
        <LoginPassword setLogin={setLoginHandler} />
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
            Password Saver Register
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

                    <FormControl sx={{ margin: '.2rem 0' }}  variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        id="outlined-adornment-password"
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
                    <FormControl sx={{ margin: '.2rem 0' }}  variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
                        <OutlinedInput
                        id="outlined-adornment-password2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        disabled={!formValidate ? true : false}
                        onClick={() => setPasswordAuthHandler()}
                        sx={{ margin: '.2rem 0', padding: '1rem' }} >Register</Button>
                </Grid>
                <Box sx={{textAlign:'center'}}>
                  <a href="#" onClick={() => {setLoginModal(true);handleClose()}} style={{color: '#1565c0', textDecoration:'none'}}>I Have A Account</a>
                </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default RegisterPassword