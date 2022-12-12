import { Box, Button, Grid, TextField } from '@mui/material'
import { useState } from 'react'

interface searchFormInterface {
    search:Function
}


const SearchForm = (props:searchFormInterface) => {
    const {search} = props
    const [searchInput, setSearchInput] = useState('')

  return (
    <Grid container gap={1}>
        <Grid item md={8} sm={12}>
            <TextField id="filled-basic" label="Search In Google" variant="outlined" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} fullWidth/>
        </Grid>
        <Grid item md={3} sm={12}>
        <Button
              variant='contained'
              color='primary'
              fullWidth 
              sx={{ height: '100%' }}
              onClick={() => search(searchInput)}>SEARCH</Button>
        </Grid>
    </Grid>
  )
}

export default SearchForm