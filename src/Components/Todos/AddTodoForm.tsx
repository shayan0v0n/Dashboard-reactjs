import { useState, useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useAddActiveTodoMutation, useFetchActiveTodosQuery } from '../../Slices/todo-active-slice/todoActiveSlice'
import { useAddUserActiveTodoMutation } from '../../Slices/users-slice/userActiveTodoSlice'
interface addTodoFormProps {
    currentName?: string
}

const AddTodoForm = (props: addTodoFormProps) => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  const [addActiveTodo] = useAddActiveTodoMutation()
  const [addUserActiveTodo] = useAddUserActiveTodoMutation()
  const [ addTodo, setAddTodo ] = useState(props.currentName ? props.currentName : '');
  const [formValidate, setFormValidate] = useState(false)

  useEffect(() => {
    checkFormValidate()
  }, [addTodo])

  const setAddTodoHandler = (currentTodo: string): void => {
    const createActiveTodo: {title:string} = {
      title: currentTodo
    }
    addActiveTodo(createActiveTodo).then(({data}:any) => {
      const userActiveTodoParams:{userId:string, todoId:string} = {
        userId:currentLocalStorageJSON._id,
        todoId:data._id
      }

      addUserActiveTodo(userActiveTodoParams)
    })
    setAddTodo('')
  }

  const checkFormValidate = () => {
    if (addTodo.trim().length !== 0) setFormValidate(true)
    else setFormValidate(false)
  }
  

  return (
    <Grid container gap={1}>
        <Grid item xs={12} md={8}>
          <TextField id="filled-basic" label="Add Todo" variant="outlined" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} fullWidth/>
        </Grid>
        <Grid item xs={12} md={3}>
            <Button 
              variant='contained' 
              color='primary' 
              fullWidth 
              sx={{ height: '100%' }}
              disabled={formValidate ? false : true}
              onClick={() => setAddTodoHandler(addTodo)}>SUBMIT</Button>
        </Grid>
    </Grid>
  )
}

export default AddTodoForm