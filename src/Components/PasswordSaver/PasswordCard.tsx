import { Chip, Card, Tooltip, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { styled, CardProps } from "@mui/material";
import EditPasswordForm from "./EditPasswordForm";
import ShowPasswordForm from "./ShowPasswordForm";
import { useDeletePasswordMutation, useUpdatePasswordMutation } from "../../Slices/password-saver-slice/passwordSaverSlice";
import { useUpdateActiveTodoMutation } from "../../Slices/todo-active-slice/todoActiveSlice";
import { useFetchUserPasswordQuery, useRemoveUserPasswordMutation } from "../../Slices/users-slice/userPasswordSlice";

interface currentPassowrdsStructure {_id: string, title: string, password: string} 
interface passwordCardProps {
    currentPassword: currentPassowrdsStructure
    login: boolean
}

const CardPasswordSaver = styled(Card)<CardProps>({
  margin: '1rem',
  padding: '.8rem',
  display: "flex",
  justifyContent: 'space-between',
  border: '0.2px solid #1565c0'
})

const PasswordCard = (props: passwordCardProps) => {  
    const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
    const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
    const passwordSaverList = useFetchUserPasswordQuery(currentLocalStorageJSON._id)
    const [deletePassword] = useDeletePasswordMutation()
    const [deleteUserPassword] = useRemoveUserPasswordMutation()
    const [updatePassword] = useUpdatePasswordMutation()
    const {currentPassword, login} = props
    const [toggleMenu] = useState(window.innerWidth <= 600 ? false : true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [editMode, setEditMode] = useState(false)
    const [showMode, setShowMode] = useState(false)

    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}

    const editPasswordHandler = async (newPass: currentPassowrdsStructure) => {
      const newPassBody: {title:string, password:string} = {
        title: newPass.title,
        password: newPass.password
      }      
      const query:{id:string, body:{title:string, password:string}} = {id:newPass._id, body:newPassBody}
      
      await updatePassword(query)
      passwordSaverList.refetch()
      setEditMode(false)
    }
    
    const deletePasswordHandler = () => {
      deletePassword(currentPassword._id).then(({data}:any) => {
        const passwordParams:{userId:string, passId:string} = {
          userId: currentLocalStorageJSON._id,
          passId: data._id
        }

        deleteUserPassword(passwordParams)
      })
      setEditMode(false)
    }

  return (
    !showMode ? (
      !editMode ? (
        <CardPasswordSaver>
            <Typography sx={{fontWeight: 'bold', flexGrow: 1, margin: 'auto'}} >{currentPassword.title}</Typography>
            
            <Box sx={{ cursor: 'pointer', display: 'flex' }} alignItems="center">
              <Button id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={menuHandleClick} ><MoreVertIcon /></Button>
                  <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      sx={{ margin: 'auto' }}
                      onClose={menuHandleClose}
                      MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}>
                    <MenuItem 
                     disabled={login ? true : false} 
                     onClick={() => {menuHandleClose(); setEditMode(true)}}>Edit</MenuItem>
                    <MenuItem 
                     disabled={login ? true : false} 
                     onClick={() => {menuHandleClose(); setShowMode(true)}}>Show</MenuItem>
                    <MenuItem 
                     disabled={login ? true : false} 
                     onClick={() => {menuHandleClose(); deletePasswordHandler()}}>Delete</MenuItem>
                  </Menu>
                    {toggleMenu ? (
                      <Chip
                      label={!login ? "Unlocked" : "Locked"} 
                      sx={{ cursor: 'default' }} 
                      icon={!login ? <LockOpenIcon /> : <LockIcon />} />
                    ) : null}
            </Box>
        </CardPasswordSaver>
        ): (
            <Card sx={{ padding: '0 1rem' }}>
                <EditPasswordForm 
                 currentPassword={currentPassword}
                 passwordHandler={editPasswordHandler} /> 
            </Card>
        )
        ) : (
          <Card sx={{ padding: '0 1rem' }}>
            <ShowPasswordForm 
              currentPassword={currentPassword}
              passwordHandler={setShowMode}/> 
          </Card>
    )
  )
}

export default PasswordCard