import { Box, Container } from '@mui/material'
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import LoginPassword from '../Components/PasswordAuth/LoginPassword';
import PasswordCard from '../Components/PasswordSaver/PasswordCard';
import AddPasswordForm from '../Components/PasswordSaver/AddPasswordForm';
import { useFetchPasswordsQuery } from '../Slices/password-saver-slice/passwordSaverSlice';
import useLoading from '../store/useLoading';
interface currentPassowrdsStructure {_id: string, title: string, password: string}

const PasswordSaver = () => {
  const passwordSaverList = useFetchPasswordsQuery()
  const [loginModal, setLoginModal] = useState(true)
  const [loginStatus, setLoginStatus] = useState(true)
  const {toggleModeOn, toggleModeOff} = useLoading()

  useEffect(() => {
    !passwordSaverList.isSuccess ? toggleModeOn() : toggleModeOff()
  }, [passwordSaverList])

  const setLoginHandler = () => {
    setLoginModal(false)
    setLoginStatus(false)
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Container>
     <Box sx={{ marginTop: '2rem' }}>
     {loginModal ? (
        <LoginPassword setLogin={setLoginHandler} />
      ) : null}
        {passwordSaverList.isSuccess ? (
          <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
            {passwordSaverList.data.map((password:currentPassowrdsStructure) => (
            <motion.div key={password._id} className="item" variants={item}>
                <PasswordCard 
                key={password._id} 
                currentPassword={password}
                login={loginStatus} />
            </motion.div>
            ))}
        </motion.div>
        ) : <p>Loading...</p>}
      <AddPasswordForm 
       login={loginStatus} /> 
     </Box>
    </Container>
  )
}

export default PasswordSaver