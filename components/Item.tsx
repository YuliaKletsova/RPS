import { Box, Card, Stack, Typography} from "@mui/material";
import Image from "next/image";
import { Scissors } from "./Scissors";
import { Paper } from "./Paper";
import {Unknown} from "./Unknown";


export const ITEMS = ['rock', 'scissors', 'paper']

export const Item = ({ itemName, onChooseItem }:{ itemName: string | null, onChooseItem?: () => void }) => {
  let content = null;
  
  switch (itemName) {
    case 'rock':
      content = <Image src={`/${itemName}.png`} alt={itemName.toUpperCase()} width={100} height={100} />
      break;
    case 'scissors':
      content = <Box p={2}><Scissors /></Box>
      break;
    case 'paper':
      content = <Box p={2}><Paper /></Box>
      break;
    default:
      content = <Box p={2}><Unknown /></Box>
      break;
  }

  return (
    <Card 
        variant="outlined"
        sx={{
            width: 200,
            height: 200,
        }}
        onClick={onChooseItem}
      >
        <Stack 
          sx={{height: '100%'}}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          >
            {content}
            <Typography>{!!itemName ? itemName.toUpperCase() : 'UNKNOWN'}</Typography>
        </Stack>
    </Card>
)}