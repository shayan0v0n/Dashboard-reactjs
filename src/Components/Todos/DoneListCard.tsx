import React, { useState } from 'react'
import { Card, Typography, Tooltip, Box, Button, MenuItem, Menu } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import EditTodoForm from './EditTodoForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, CardProps } from "@mui/material";
import { useFetchDoneTodosQuery, useDeleteDoneTodoMutation } from '../../Slices/todo-done-slice/todoDoneSlice';
import { useAddActiveTodoMutation } from '../../Slices/todo-active-slice/todoActiveSlice';

type todoStructureProps = { title: string, _id: string };
interface DoneListProps {
    currentTodo: todoStructureProps,
    doneListEdit: Function
}

const DoneListCard = (props: DoneListProps): JSX.Element => {
  const [deleteDoneTodo] = useDeleteDoneTodoMutation()
  const [addActiveList] = useAddActiveTodoMutation()
  const {currentTodo, doneListEdit} = props
  const [doneListEditMode, setDoneListEditMode] = useState(false)
  const [toggleMenu] = useState(window.innerWidth <= 600 ? false : true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [currentStatusCard, setCurrentStatusCard] = useState('none');
  
  const CardDoneList = styled(Card)<CardProps>({
    margin: '1rem',
    padding: '.8rem',
    display: "flex",
    justifyContent: 'space-between',
    border: `0.2px solid ${currentStatusCard}`,
    boxShadow: `0px 0px 10px ${currentStatusCard}`
  })
  
  const doneListEditHandler = (newTodo: string) => {doneListEdit(currentTodo, newTodo);setDoneListEditMode(false)}
    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}

    const deleteDoneListHandler = (currentTodo: todoStructureProps) => {
      deleteDoneTodo(currentTodo._id)
    }

    const setDoneList = (currentTodo: todoStructureProps) => {
      addActiveList({title: currentTodo.title})
    }

    const returnDoneListHandler = (currentTodo: todoStructureProps) => {
      deleteDoneListHandler(currentTodo)
      setDoneList(currentTodo)
    }

  return (
    <CardDoneList
      onMouseEnter={() => setCurrentStatusCard('#cfcccc')}
      onMouseLeave={() => setCurrentStatusCard('none')}>
        {!doneListEditMode ? (
          <>
          <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.title}</Typography>
          {toggleMenu ? (
            <Box>
            <Tooltip title={`Delete ${currentTodo.title} From Done List`}>
              <DeleteIcon
              onMouseEnter={() => setCurrentStatusCard('#c62828')}
              onMouseLeave={() => setCurrentStatusCard('none')}
              color="error" 
              sx={{ margin: '0 .3rem', cursor: 'pointer' }} 
              onClick={() => deleteDoneListHandler(currentTodo)} />
            </Tooltip>
            <Tooltip title={`Edit ${currentTodo.title} `}>
              <EditIcon
                onMouseEnter={() => setCurrentStatusCard('#1565c0')}
                onMouseLeave={() => setCurrentStatusCard('none')}
               color="primary" 
               sx={{ margin: '0 .3rem', cursor: 'pointer' }} 
               onClick={() => setDoneListEditMode(true)} />
            </Tooltip>
            <Tooltip title={`Add ${currentTodo.title} To Active List`}>
              <KeyboardReturnIcon 
              onMouseEnter={() => setCurrentStatusCard('#7dcfb6')}
              onMouseLeave={() => setCurrentStatusCard('none')}
              color="success" 
              sx={{ margin: '0 .3rem', cursor: 'pointer' }} 
              onClick={() => returnDoneListHandler(currentTodo)} />
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
              <MenuItem onClick={() => setDoneListEditMode(true)}>Edit</MenuItem>
              <MenuItem onClick={() => deleteDoneListHandler(currentTodo)}>Delete</MenuItem>
              <MenuItem onClick={() => returnDoneListHandler(currentTodo)}>AddToDone</MenuItem>
            </Menu>
          </Box>
          )}
          </>
        ) : (
          <EditTodoForm
            menuHandle={menuHandleClose}
            currentName={currentTodo.title}
            formSubmit={doneListEditHandler} />
        )}
    </CardDoneList>
  )
}

export default DoneListCard