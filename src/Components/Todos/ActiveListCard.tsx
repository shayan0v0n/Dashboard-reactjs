import { Card, Typography, Tooltip, Box, Button, Menu, MenuItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, CardProps } from "@mui/material";
import { useDeleteActiveTodoMutation, useFetchActiveTodosQuery } from "../../Slices/todo-active-slice/todoActiveSlice";
import { useAddDoneTodoMutation, useFetchDoneTodosQuery } from "../../Slices/todo-done-slice/todoDoneSlice";

type todoStructureProps = { title: string, _id: string };
interface activeListProps {
  currentTodo: todoStructureProps,
  activeListEdit: Function
}


const ActiveListCard = (props: activeListProps): JSX.Element => {
  const activeList = useFetchActiveTodosQuery() // { data, isFetching }
  const doneList = useFetchDoneTodosQuery() // { data, isFetching }
  const [deleteActiveTodo, responseActiveTodo] = useDeleteActiveTodoMutation()
  const [addDoneTodo, responseDoneTodo] = useAddDoneTodoMutation()
  
  const [currentStatusCard, setCurrentStatusCard] = useState('none');
  const { currentTodo, activeListEdit} = props
  const [toggleMenu, setToggleMenu] = useState(window.innerWidth <= 600 ? false : true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeListEditMode, setActiveListEditMode] = useState(false)
  const openMenu = Boolean(anchorEl);
  const CardActiveList = styled(Card)<CardProps>({
    margin: '1rem',
    padding: '.8rem',
    display: "flex",
    justifyContent: 'space-between',
    border: `0.2px solid ${currentStatusCard}`,
    boxShadow: `0px 0px 10px ${currentStatusCard}`
  })
  
  const activeListEditHandler = (newTodo: string) => {activeListEdit(currentTodo, newTodo);setActiveListEditMode(false)}
  const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const menuHandleClose = () => {setAnchorEl(null)}

  const deleteActiveListTodoHandler = (currentTodo: todoStructureProps) => {
    deleteActiveTodo(currentTodo._id)
  }

  const setDoneList = (currentTodo: todoStructureProps) => {
    addDoneTodo({title: currentTodo.title})
  }
  
  const setTodoInDoneList = (currentTodo: todoStructureProps) => {
    setDoneList(currentTodo)
    deleteActiveListTodoHandler(currentTodo)
  }



  return (
    <CardActiveList 
      onMouseEnter={() => setCurrentStatusCard('#cfcccc')}
      onMouseLeave={() => setCurrentStatusCard('none')}>
      {!activeListEditMode ? (
        <>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.title}</Typography>
        {toggleMenu ? (
        <Box>
        <Tooltip title={`Delete ${currentTodo.title} From Active List`}>
          <DeleteIcon
            onMouseEnter={() => setCurrentStatusCard('#c62828')}
            onMouseLeave={() => setCurrentStatusCard('none')}
            sx={{ margin: '0 .3rem', cursor: 'pointer' }} 
            color="error" 
            onClick={() => deleteActiveListTodoHandler(currentTodo)} />
        </Tooltip>
        <Tooltip title={`Edit ${currentTodo.title} `}>
          <EditIcon
          onMouseEnter={() => setCurrentStatusCard('#1565c0')}
          onMouseLeave={() => setCurrentStatusCard('none')}
          sx={{ margin: '0 .3rem', cursor: 'pointer' }} 
          color="primary" 
          onClick={() => setActiveListEditMode(true)} />
        </Tooltip>
        <Tooltip title={`Add ${currentTodo.title} To Done List`}>
          <CheckBoxIcon
          onMouseEnter={() => setCurrentStatusCard('#7dcfb6')}
          onMouseLeave={() => setCurrentStatusCard('none')}
          color="success"
          sx={{ margin: '0 .3rem', cursor: 'pointer' }}
          onClick={() => setTodoInDoneList(currentTodo)} />
        </Tooltip>
        </Box>
        ): (
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
            <MenuItem onClick={() => setActiveListEditMode(true)}>Edit</MenuItem>
            <MenuItem onClick={() => deleteActiveListTodoHandler(currentTodo)}>Delete</MenuItem>
            <MenuItem onClick={() => {setTodoInDoneList(currentTodo)}}>AddToDone</MenuItem>
          </Menu>
        </Box>
        )}
        </>        
      ) : (
        <EditTodoForm 
         menuHandle={menuHandleClose}
         currentName={currentTodo.title}
         formSubmit={activeListEditHandler} />
      )}
    </CardActiveList>
  )
}

export default ActiveListCard