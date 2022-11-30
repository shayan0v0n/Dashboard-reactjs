import { Box, Container } from '@mui/material'
import { useState } from 'react';
import LoginPassword from '../Components/PasswordAuth/LoginPassword';
import PasswordCard from '../Components/PasswordSaver/PasswordCard';
import AddPasswordForm from '../Components/PasswordSaver/AddPasswordForm';
import { useFetchPasswordsQuery } from '../Slices/password-saver-slice/passwordSaverSlice';
interface currentPassowrdsStructure {_id: string, title: string, password: string}

const PasswordSaver = () => {
  const passwordSaverList = useFetchPasswordsQuery()
  const [loginModal, setLoginModal] = useState(true)
  const [loginStatus, setLoginStatus] = useState(true)

  const setLoginHandler = () => {
    setLoginModal(false)
    setLoginStatus(false)
  }

  return (
    <Container>
     <Box sx={{ marginTop: '2rem' }}>
     {loginModal ? (
        <LoginPassword setLogin={setLoginHandler} />
      ) : null}
        {passwordSaverList.isSuccess ? (
          <Box>
            {passwordSaverList.data.map((password:currentPassowrdsStructure) => (
              <PasswordCard 
              key={password._id} 
              currentPassword={password}
              login={loginStatus} />
            ))}
        </Box>
        ) : <p>Loading...</p>}
      <AddPasswordForm 
       login={loginStatus} /> 
     </Box>
    </Container>
  )
}

export default PasswordSaver