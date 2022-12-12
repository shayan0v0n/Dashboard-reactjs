import { Box, Container, Grid, TextField } from '@mui/material'
import React, {useState} from 'react'
import SearchForm from '../Components/Search/SearchForm'
import SearchResCards from '../Components/Search/SearchResCards'


const Search = () => {
  const [searchTermData, setSearchTermData] = useState('')
  const searchHandler = (searchTerm:string) => {
    setSearchTermData(searchTerm)
  }

  return (
    <Container>
      <Box>
        <SearchForm search={searchHandler} />
      </Box>
      <Box>
        <SearchResCards searchRes={searchTermData} />
      </Box>
    </Container>
  )
}

export default Search