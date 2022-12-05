import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import { motion } from "framer-motion";
import IncomeCard from '../Components/Wallet/IncomeCard'
import IncomeForm from '../Components/Wallet/IncomeForm'
import SpendCard from '../Components/Wallet/SpendCard'
import SpendForm from '../Components/Wallet/SpendForm'
interface incomeAndSpendStructure { title: String, value: Number, id: String, createdData: number}

const Wallet = () => {
  const navigate = useNavigate()
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [incomeList, setIncomeList]: any[] = useState(currentStorageJSON.wallet.income)
  const [spendList, setSpendList]: any[] = useState(currentStorageJSON.wallet.spend)
  const [walletStatusValidate, setWalletStatusValidate] = useState(false)
  useEffect(() => {
    if (spendList.length !== 0 && incomeList.length !== 0) {
      setWalletStatusValidate(true)
    }else setWalletStatusValidate(false) 
  }, [incomeList, spendList])  

  const setIncomeListHandler = (incomeData: { title: string, value: number }) => {
    const currentTime = new Date().valueOf()
    const incomeStructure: incomeAndSpendStructure = {
      ...incomeData,
      createdData: currentTime,
      id: uuid()
    }

    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        income: [...currentStorageJSON.wallet.income, incomeStructure]
      }
    }
    setIncomeList([...currentStorageJSON.wallet.income, incomeStructure])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }
  
  const setSpendListHandler = (spendData: { title: string, value: number }) => {
    const currentTime = new Date().valueOf()
    const spendStructure: incomeAndSpendStructure = {
      ...spendData,
      createdData: currentTime,
      id: uuid()
    }

    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        spend: [...currentStorageJSON.wallet.spend, spendStructure]
      }
    }
    setSpendList([...currentStorageJSON.wallet.spend, spendStructure])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const deleteIncomeCardHandler = (incomeID: string) => {
    const updateIncomeList = incomeList.filter((income: incomeAndSpendStructure) => income.id !== incomeID)
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        income: updateIncomeList
      }
    }
    
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setIncomeList(updateIncomeList)
  }

  const deleteSpendCardHandler = (spendID: string) => {
    const updateSpendList = spendList.filter((spend: incomeAndSpendStructure) => spend.id !== spendID)
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        spend: updateSpendList
      }
    }
    
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setSpendList(updateSpendList)
  }

  const updateSpendCardHandler = (updatedSpendCard: incomeAndSpendStructure) => {
    const currentStorage: any[] = [...spendList]
    const indexSpendCard = currentStorage.findIndex((spend: incomeAndSpendStructure) => spend.id === updatedSpendCard.id)
    currentStorage[indexSpendCard] = updatedSpendCard
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        spend: currentStorage
      }
    }

    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setSpendList(currentStorage)
  }

  const updateIncomeCardHandler = (updatedIncomeCard: incomeAndSpendStructure) => {
    const currentStorage: any[] = [...incomeList]
    const indexSpendCard = currentStorage.findIndex((income: incomeAndSpendStructure) => income.id === updatedIncomeCard.id)
    currentStorage[indexSpendCard] = updatedIncomeCard
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        income: currentStorage
      }
    }

    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setIncomeList(currentStorage)
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
    <>
     <Button onClick={() => {navigate('/walletControl/walletStatus')}} fullWidth variant='contained' sx={{ padding: '2rem 1rem', margin: '1rem 0' }} disabled={walletStatusValidate ? false : true}>WALLET STATUS</Button>
      <Grid container gap={2} margin="1rem" justifyContent="center">
        <Grid item xs={12} md={5} margin="1rem" textAlign='center'>
          <Typography variant='h5' fontWeight="bold">Income Items💵</Typography>
          <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          >
            { incomeList.map((income: incomeAndSpendStructure, index: number) => (
              <motion.div key={index} className="item" variants={item}>
              <IncomeCard key={index}
               incomeData={income}
               deleteIncomeCard={deleteIncomeCardHandler}
               updateIncomeCard={updateIncomeCardHandler} />
               </motion.div>
            )) }
          </motion.div>
            <IncomeForm setIncomeList={setIncomeListHandler} />
        </Grid>
        <Grid item xs={12} md={5} margin="1rem" textAlign='center'>
          <Typography variant='h5' fontWeight="bold">Spend Items💰</Typography>
          <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          >
            { spendList.map((spend: incomeAndSpendStructure, index: number) => (
              <motion.div key={index} className="item" variants={item}>
                <SpendCard
                key={index}
                spendData={spend}
                deleteSpendCard={deleteSpendCardHandler}
                updateSpendCard={updateSpendCardHandler} />
              </motion.div>
            )) }
          </motion.div>
          <SpendForm setSpendList={setSpendListHandler} />
        </Grid>
      </Grid>
    </>
  )
}

export default Wallet