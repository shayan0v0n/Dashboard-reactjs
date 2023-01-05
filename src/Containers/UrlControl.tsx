import { Box, Container} from '@mui/material'
import { useEffect } from 'react';
import { motion } from "framer-motion";
import AddUrlForm from '../Components/UrlControl/AddUrlForm'
import UrlCard from '../Components/UrlControl/UrlCard';
import useLoading from '../store/useLoading';
import { useFetchUserUrlsQuery } from '../Slices/users-slice/userUrlsSlice';

const UrlControl = () => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
  const {toggleModeOn, toggleModeOff} = useLoading()
  const urlList = useFetchUserUrlsQuery(currentLocalStorageJSON._id)  
  useEffect(() => {
    !urlList.isSuccess ? toggleModeOn() : toggleModeOff()
  }, [urlList])


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
      <Box sx={{ marginBottom: '2rem' }}>
        {urlList.isSuccess ? (
          <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {urlList.data.map((url:any) => (
          <motion.div key={url._id} className="item" variants={item}>
            <UrlCard key={url._id} currentUrl={url}/>
          </motion.div>
          ))}
          </motion.div>
        ) : null}
      </Box>
      <AddUrlForm />
    </Container>
  )
}

export default UrlControl