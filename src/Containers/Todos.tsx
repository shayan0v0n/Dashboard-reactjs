import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import ActiveListCard from '../Components/Todos/ActiveListCard';
import AddTodoForm from '../Components/Todos/AddTodoForm';
import DoneListCard from '../Components/Todos/DoneListCard';
import { useFetchActiveTodosQuery, useUpdateActiveTodoMutation } from '../Slices/todo-active-slice/todoActiveSlice';
import { useFetchDoneTodosQuery, useUpdateDoneTodoMutation } from '../Slices/todo-done-slice/todoDoneSlice';
type todoStructureProps = { title: string, _id: string };

export const Todos = () => {
  const activeList = useFetchActiveTodosQuery() // { data, isFetching }
  const doneList = useFetchDoneTodosQuery(); // { data, isFetching }
  const [updateActiveList] = useUpdateActiveTodoMutation()
  const [updateDoneList] = useUpdateDoneTodoMutation()

  const activeListEditHandler = (currentTodo: todoStructureProps, newTodo: string) => {
    updateActiveList({id:currentTodo._id, body:{title: newTodo}})
  }

  const doneListEditHandler = (currentTodo: todoStructureProps, newTodo: string) => {
    updateDoneList({id:currentTodo._id, body:{title: newTodo}})
  }

  return (
      <Container>
        <Grid container gap={2} justifyContent="center">
            <Grid item xs={12} md={5} margin="1rem" textAlign="center">
            <h2>َActive List🐷🍫</h2>
                {activeList.isSuccess ? (
                    <>
                    { activeList.data.map((todo: todoStructureProps) => (
                      <ActiveListCard 
                          key={todo._id} 
                          currentTodo={todo} 
                          activeListEdit={activeListEditHandler} />
                    )) }
                  </>
                ) : <p>Loading...</p>}
             <AddTodoForm />
            </Grid>

          <Grid item xs={12} md={5} margin="1rem" textAlign="center">
            <h2>Done List🐨🍭</h2>
            {doneList.isSuccess ? (
              doneList.data.map((todo: todoStructureProps) => (
                  <DoneListCard 
                  key={todo._id} 
                  currentTodo={todo}
                  doneListEdit={doneListEditHandler} />
              )) 
            ) : <p>Loading...</p>}
          </Grid>
        </Grid>
      </Container>
  )
}