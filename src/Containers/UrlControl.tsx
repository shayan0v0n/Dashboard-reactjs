import { Box, Container} from '@mui/material'
import { useEffect } from 'react';
import { motion } from "framer-motion";
import AddUrlForm from '../Components/UrlControl/AddUrlForm'
import UrlCard from '../Components/UrlControl/UrlCard';
import { useFetchUrlListQuery } from '../Slices/urls-slice/urlsSplice';
import useLoading from '../store/useLoading';

const UrlControl = () => {
  const {toggleModeOn, toggleModeOff} = useLoading()
  const urlList = useFetchUrlListQuery()  
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