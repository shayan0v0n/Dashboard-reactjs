import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect } from 'react'
import ActiveListCard from '../Components/Todos/ActiveListCard';
import { motion } from "framer-motion";
import AddTodoForm from '../Components/Todos/AddTodoForm';
import DoneListCard from '../Components/Todos/DoneListCard';
import { useFetchActiveTodosQuery, useUpdateActiveTodoMutation } from '../Slices/todo-active-slice/todoActiveSlice';
import { useFetchDoneTodosQuery, useUpdateDoneTodoMutation } from '../Slices/todo-done-slice/todoDoneSlice';
import useLoading from '../store/useLoading';
import { useFetchUserActiveTodoQuery } from '../Slices/users-slice/userActiveTodoSlice';
import { useFetchUserDoneTodosQuery } from '../Slices/users-slice/userDoneTodoSlice';
type todoStructureProps = { title: string, _id: string };

export const Todos = () => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
  const activeList = useFetchUserActiveTodoQuery(currentLocalStorageJSON._id) // { data, isFetching }
  const doneList = useFetchUserDoneTodosQuery(currentLocalStorageJSON._id); // { data, isFetching }
  const {toggleModeOn, toggleModeOff} = useLoading()
  const [updateActiveList] = useUpdateActiveTodoMutation()
  const [updateDoneList] = useUpdateDoneTodoMutation()

  useEffect(() => {
    !activeList.isSuccess && !doneList.isSuccess ? toggleModeOn() : toggleModeOff()
  }, [activeList, doneList])

  const activeListEditHandler = async (currentTodo: todoStructureProps, newTodo: string) => {
    await updateActiveList({id:currentTodo._id, body:{title: newTodo}})
    activeList.refetch()
  }

  const doneListEditHandler = async (currentTodo: todoStructureProps, newTodo: string) => {
    await updateDoneList({id:currentTodo._id, body:{title: newTodo}})
    doneList.refetch()
  }

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

  return (
      <Container>
        <Grid container gap={2} justifyContent="center">
            <Grid item xs={12} md={5} margin="1rem" textAlign="center">
            <h2>Active List🐷🍫</h2>
                {activeList.isSuccess ? (
                    <motion.div
                      className="container"
                      variants={container}
                      initial="hidden"
                      animate="visible"
                    >
                    { activeList.data.map((todo: todoStructureProps) => (
                      <motion.div key={todo._id} className="item" variants={item}>
                        <ActiveListCard 
                            key={todo._id} 
                            currentTodo={todo} 
                            activeListEdit={activeListEditHandler} />
                      </motion.div>
                    )) }
                    </motion.div>
                ) : null}
             <AddTodoForm />
            </Grid>

          <Grid item xs={12} md={5} margin="1rem" textAlign="center">
            <h2>Done List🐨🍭</h2>
            {doneList.isSuccess ? (
            <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible">
              {doneList.data.map((todo: todoStructureProps) => (
                <motion.div key={todo._id} className="item" variants={item}>
                  <DoneListCard 
                  key={todo._id} 
                  currentTodo={todo}
                  doneListEdit={doneListEditHandler} />
                </motion.div>
              ))}
            </motion.div>
            ) : null}
          </Grid>
        </Grid>
      </Container>
  )
}