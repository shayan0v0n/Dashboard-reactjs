import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import IncomeCard from '../Components/Wallet/IncomeCard'
import IncomeForm from '../Components/Wallet/IncomeForm'
import SpendCard from '../Components/Wallet/SpendCard'
import SpendForm from '../Components/Wallet/SpendForm'
import { useFetchUserIncrementWalletQuery } from '../Slices/users-slice/userIncrementWalletSlice';
import { useFetchUserSpendWalletQuery } from '../Slices/users-slice/userSpendWalletSlice';

const Wallet = () => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  const walletIncome = useFetchUserIncrementWalletQuery(currentLocalStorageJSON._id)
  const walletSpend = useFetchUserSpendWalletQuery(currentLocalStorageJSON._id)
  const navigate = useNavigate()

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
      {walletIncome.isSuccess && walletSpend.isSuccess ? (
        [...walletIncome.data, ...walletSpend.data].length !== 0 ? (
          <Button onClick={() => {navigate('/walletControl/walletStatus')}} fullWidth variant='contained' sx={{ padding: '2rem 1rem', margin: '1rem 0' }}>WALLET STATUS</Button>
        ) : (
          <Button onClick={() => {navigate('/walletControl/walletStatus')}} fullWidth variant='contained' sx={{ padding: '2rem 1rem', margin: '1rem 0' }} disabled>WALLET STATUS</Button>
        )
      ) : null}
      <Grid container gap={2} margin="1rem" justifyContent="center">
        <Grid item xs={12} md={5} margin="1rem" textAlign='center'>
          <Typography variant='h5' fontWeight="bold">Income Items💵</Typography>
          {walletIncome.isSuccess ? (
            <motion.div
            className="container"
            variants={container}
            initial="hidden"
            animate="visible"
            >
              { walletIncome.data.map((income: any) => (
                <motion.div key={income._id} className="item" variants={item}>
                <IncomeCard key={income._id}
                 incomeData={income} />
                 </motion.div>
              )) }
            </motion.div>
          ) : null}
            <IncomeForm />
        </Grid>
        <Grid item xs={12} md={5} margin="1rem" textAlign='center'>
          <Typography variant='h5' fontWeight="bold">Spend Items💰</Typography>
          {walletSpend.isSuccess ? (
          <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          >
            { walletSpend.data.map((spend: any, index: number) => (
              <motion.div key={index} className="item" variants={item}>
                <SpendCard
                key={index}
                spendData={spend} />
              </motion.div>
            )) }
          </motion.div>
          ) : null}
          <SpendForm />
        </Grid>
      </Grid>
    </>
  )
}

export default Wallet