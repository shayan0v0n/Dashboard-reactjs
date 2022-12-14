import { Card, Typography, Box, Tooltip, Button } from '@mui/material'
import { styled, CardProps } from "@mui/material";
import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import EditSpendCard from './EditSpendCard';
import { useDeleteWalletSpendMutation, useUpdateWalletSpendMutation } from '../../Slices/wallet-spend-slice/walletSpendSlice';
import { useFetchUserSpendWalletQuery, useRemoveSpendWalletMutation } from '../../Slices/users-slice/userSpendWalletSlice';
type incomeAndSpendStructure = { title:string, value:number, _id:string }
interface spendCardProps {
  spendData: incomeAndSpendStructure
}

const SpendCardContainer = styled(Card)<CardProps>({ 
  margin: '1rem',
  padding: '.8rem', 
  display: "flex", 
  justifyContent: 'space-between', 
  color: 'white', 
  border: '3px solid #c30010',
  background: '#ee6b6e'
})


const SpendCard = (props: spendCardProps) => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  const { spendData } = props
  const [deleteWalletMutation]  = useDeleteWalletSpendMutation()
  const walletSpend = useFetchUserSpendWalletQuery(currentLocalStorageJSON._id)
  const [deleteUserWalletMutation] = useRemoveSpendWalletMutation()
  const [updateWalletMutation]  = useUpdateWalletSpendMutation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const menuHandleClose = () => {setAnchorEl(null)}
  const [editMode, setEditMode] = useState(false)

  const deleteButtonHandler = () => {
    deleteWalletMutation(spendData._id).then(({data}:any) => {
      const walletSpendParams:{userId:string, spdId:string} = {
        userId: currentLocalStorageJSON._id,
        spdId: data._id
      }

      deleteUserWalletMutation(walletSpendParams)
    })
    menuHandleClose()
  }

  const editButtonHandler = () => setEditMode(true)

  const updateButtonHandler = (updatedData: incomeAndSpendStructure) => {
    updateWalletMutation({id:updatedData._id , body: updatedData})
    walletSpend.refetch()
    menuHandleClose()
    setEditMode(false)
  }


  return (
    !editMode ? (
      <SpendCardContainer>
            <Tooltip title={`${spendData.value}`} followCursor>
                <Typography sx={{fontWeight: 'bold', flexGrow: 1, textAlign: "left", display: 'flex', alignItems: 'center'}}>{spendData.title}</Typography>
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
      </SpendCardContainer>
    ) : (
      <EditSpendCard currentSpendData={spendData} updateButtonHandler={updateButtonHandler} />
    )
  )
}

export default SpendCard