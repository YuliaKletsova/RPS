import { Box, Card, Stack, SxProps, Theme, Typography} from "@mui/material";
import Image from "next/image";
import { Scissors } from "../media/Scissors";
import { Paper } from "../media/Paper";
import {Unknown} from "../media/Unknown";
import {useResponsive} from "@/helpers/useResponsive";

export const ITEMS = ['rock', 'scissors', 'paper']

export const Item = ({ itemName, onChooseItem, customSizes }:{ itemName: string | null, onChooseItem?: () => void, customSizes?: SxProps<Theme> }) => {
  let content = null;
  const {isMobile} = useResponsive()

  const cardSize = isMobile ? {
    width: 300,
    height: 150,
  } : {
    width: 200,
    height: 200,
}
  
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
        sx={customSizes || cardSize}
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