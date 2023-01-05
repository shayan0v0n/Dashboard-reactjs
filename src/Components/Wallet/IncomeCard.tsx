import { Card, Typography, Box, Tooltip, Button } from '@mui/material'
import { styled, CardProps } from "@mui/material";
import Menu from '@mui/material/Menu'
import { useDeleteWalletIncomeMutation, useUpdateWalletIncomeMutation } from '../../Slices/wallet-income-slice/walletIncomeSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import EditIncomeCard from './EditIncomeCard';
import { useFetchUserIncrementWalletQuery, useRemoveIncrementWalletMutation } from '../../Slices/users-slice/userIncrementWalletSlice';
type walletIncomeStructure = { title:string, value:number, _id:string }
interface incomeCardProps {
  incomeData: walletIncomeStructure
}

const IncomeCardContainer = styled(Card)<CardProps>({ 
   margin: '1rem',
   padding: '.8rem',
   display: "flex", 
   justifyContent: 'space-between', 
   background: '#b3cf99', 
   color: 'white', 
   border: '3px solid #4b6043' 
})


const IncomeCard = (props: incomeCardProps) => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  const { incomeData } = props
  const walletIncome = useFetchUserIncrementWalletQuery(currentLocalStorageJSON._id)
  const [deleteWalletMutation]  = useDeleteWalletIncomeMutation()
  const [deleteUserWalletMutation] = useRemoveIncrementWalletMutation()
  const [updateWalletMutation]  = useUpdateWalletIncomeMutation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const menuHandleClose = () => {setAnchorEl(null)}
  const [editMode, setEditMode] = useState(false)

  const deleteButtonHandler = () => {
    const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
    const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
    
    deleteWalletMutation(incomeData._id).then(({data}:any) => {
      const walletIncomeParams:{userId:string, incId:string} = {
        userId: currentLocalStorageJSON._id,
        incId: data._id
      }

      deleteUserWalletMutation(walletIncomeParams)
    })
    menuHandleClose()
  }

  const editButtonHandler = () => setEditMode(true)

  const updateButtonHandler = (updatedData: walletIncomeStructure) => {
    updateWalletMutation({id: updatedData._id, body: updatedData})
    walletIncome.refetch()
    menuHandleClose()
    setEditMode(false)
  }

  return (
    !editMode ? (
        <IncomeCardContainer>
            <Tooltip title={`${incomeData.value}`} followCursor>
                <Typography sx={{fontWeight: 'bold', flexGrow: 1, textAlign: "left", display: 'flex', alignItems: 'center'}}>{incomeData.title}</Typography>
            </Tooltip>
            <Box sx={{ cursor: 'pointer', display: 'flex' }} alignItems="center">
              <Button id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                color='primary'
                onClick={menuHandleClick} ><MoreVertIcon /></Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    sx={{ margin: 'auto' }}
                    onClose={menuHandleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
              >
              <MenuItem onClick={() => editButtonHandler()}>Edit</MenuItem>
              <MenuItem onClick={() => deleteButtonHandler()}>Delete</MenuItem>
            </Menu>
          </Box>
      </IncomeCardContainer>
    ) : (
      <EditIncomeCard currentIncomeData={incomeData} updateButtonHandler={updateButtonHandler} />
    )
  )
}

export default IncomeCard