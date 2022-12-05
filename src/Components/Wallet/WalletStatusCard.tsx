import { Card, Typography, Box, Tooltip, Button } from '@mui/material'
import { styled, CardProps } from "@mui/material";


const WalletStatusCard = (props: any) => {
    const { cardData } = props
    const CardContainer = styled(Card)<CardProps>({ 
        margin: '1rem',
        padding: '.8rem', 
        display: "flex", 
        justifyContent: 'space-between', 
        color: 'white', 
        border: cardData.category == 'income' ? '0.2px solid #4b6043'  : '0.2px solid #c30010',
        boxShadow: cardData.category == 'spend' ? '0px 0px 10px #ee6b6e' : '0px 0px 10px #b3cf99'
    })
  return (
    <CardContainer>
        <Tooltip title={`Set ${cardData.category} At : ${cardData.createdAt} & Last Update At: ${cardData.updatedAt}`} followCursor>
            <Typography sx={{fontWeight: 'bold', flexGrow: 1, textAlign: "left", display: 'flex', alignItems: 'center'}}>{cardData.title}</Typography>
        </Tooltip>
            <Typography>${cardData.value}</Typography>
    </CardContainer>
  )
}

export default WalletStatusCard