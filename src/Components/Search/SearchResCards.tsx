import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box/Box'
import Card, { CardProps } from '@mui/material/Card/Card'
import {useEffect} from 'react'
import { motion } from "framer-motion";
import { useFetchSearchResultQuery } from '../../Slices/search-slice/searchSlice'
import useLoading from '../../store/useLoading'
interface SearchResInterface {
    searchRes:string
}

const CardDoneList = styled(Card)<CardProps>({
    margin: '1rem',
    padding: '.8rem',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-between'
})

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

const SearchResCards = (props:SearchResInterface) => {
    const {searchRes} = props
    const searchResult = useFetchSearchResultQuery(searchRes)
    const {toggleModeOn, toggleModeOff} = useLoading()

    useEffect(() => {
        searchResult.isLoading ? toggleModeOn() : toggleModeOff()
      }, [searchResult])

  return (
    <Box>
        {searchResult.isSuccess ? (
        <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
            >
            {searchResult.data.organic_results.map((res:any) => (
                <motion.div key={res._id} className="item" variants={item}>
                    <CardDoneList key={res.position}>
                        <p className='font-bold'>{res.displayed_link}</p>
                        <Typography onClick={() => window.location.assign(res.link)} variant='h5' sx={{fontWeight:'bold', margin: '.5rem 0', cursor: 'pointer'}}>{res.title}</Typography>
                        <Typography sx={{fontWeight:'bold', margin: '.5rem 0'}}>{res.snippet}</Typography>
                    </CardDoneList>
                </motion.div>
            ))}
        </motion.div>
        ) : (
            <Typography variant='h4' sx={{textAlign:'center', margin:'7rem 0', fontWeight:'bold'}}>Please Search About Something👽🛸</Typography>
        )}
    </Box>
  )
}

export default SearchResCards