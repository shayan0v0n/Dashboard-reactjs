import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Accordion, AccordionSummary, Box, Container, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WalletStatusCard from '../Components/Wallet/WalletStatusCard';
import { useFetchUserIncrementWalletQuery } from '../Slices/users-slice/userIncrementWalletSlice';
import { useFetchUserSpendWalletQuery } from '../Slices/users-slice/userSpendWalletSlice';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const WalletStatus = () => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)
  const navigate = useNavigate()

  const walletIncome = useFetchUserIncrementWalletQuery(currentLocalStorageJSON._id)
  const walletSpend = useFetchUserSpendWalletQuery(currentLocalStorageJSON._id)
    const incomeList = walletIncome?.data?.map((item:any) => {return {...item, category: "income"}})
    const spendList = walletSpend?.data?.map((item:any) => {return {...item, category: "spend"}})
    const cardSpendAll = incomeList?.concat(spendList)
    const allIncomeValue = incomeList?.reduce((totalValue: Number, incomeValue: any) => {return totalValue + incomeValue.value}, 0)
    const allspendValue = spendList?.reduce((totalValue: Number, spendValue: any) => {return totalValue + spendValue.value}, 0)
    const sortedCardTimeLine = cardSpendAll?.sort((a: any, b: any) => {
      if (a.createdAt > b.createdAt) {
        return 1
      }else {
        return -1
      }
    })

    if (sortedCardTimeLine?.length === 0) {
      navigate('/walletControl')
    }    
    
    const data = {
        labels: ["Spend", "Income"],
        datasets: [
          {
            label: 'Wallet Status',
            data: [allspendValue, allIncomeValue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };

  return (
    <Container sx={{ textAlign: 'center' }}>
        <Box sx={{ width: window.innerWidth >= 600 ? '400px' : '250px', margin: 'auto' }}>
            <Doughnut data={data} />
        </Box>
        <Box sx={{ marginTop: '3rem' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Icome & Spend TimeLine</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {walletIncome.isSuccess && walletSpend.isSuccess ? (
                sortedCardTimeLine?.map((item, index) => (
                  <WalletStatusCard cardData={item} key={index} />
                ))
              ) : null}
            </AccordionDetails>
          </Accordion>
        </Box>
    </Container>
  )
}

export default WalletStatus